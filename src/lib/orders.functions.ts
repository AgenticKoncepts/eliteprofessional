import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const OrderInput = z.object({
  customer_name: z.string().trim().min(1).max(200),
  customer_email: z.string().trim().email().max(200),
  customer_phone: z.string().trim().min(3).max(50),
  shipping_address: z.string().trim().min(1).max(500),
  shipping_city: z.string().trim().min(1).max(100),
  shipping_country: z.string().trim().min(1).max(100),
  shipping_notes: z.string().trim().max(500).nullable().optional(),
  items: z
    .array(
      z.object({
        product_id: z.string().min(1).max(200),
        variant: z.string().max(200).nullable().optional(),
        qty: z.number().int().min(1).max(999),
      })
    )
    .min(1)
    .max(100),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => OrderInput.parse(input))
  .handler(async ({ data }) => {
    // Re-fetch authoritative prices server-side. Support both uuid id and slug.
    const ids = Array.from(new Set(data.items.map((i) => i.product_id)));
    const { data: byId } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, price_aed, primary_image, is_published, in_stock")
      .in("id", ids.filter((v) => /^[0-9a-f-]{36}$/i.test(v)));
    const { data: bySlug } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, price_aed, primary_image, is_published, in_stock")
      .in("slug", ids);
    const map = new Map<string, any>();
    for (const p of [...(byId ?? []), ...(bySlug ?? [])]) {
      map.set(p.id, p);
      if (p.slug) map.set(p.slug, p);
    }

    const enriched = data.items.map((i) => {
      const p = map.get(i.product_id);
      if (!p) throw new Error(`Unknown product: ${i.product_id}`);
      if (!p.is_published) throw new Error(`Product unavailable: ${p.name}`);
      const price = Number(p.price_aed) || 0;
      return {
        product_id: p.id,
        name: p.name,
        image: p.primary_image,
        variant: i.variant ?? null,
        price_aed: price,
        qty: i.qty,
        line_total_aed: Number((price * i.qty).toFixed(2)),
      };
    });

    const subtotal = Number(
      enriched.reduce((s, i) => s + i.line_total_aed, 0).toFixed(2)
    );

    const { data: inserted, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        shipping_address: data.shipping_address,
        shipping_city: data.shipping_city,
        shipping_country: data.shipping_country,
        shipping_notes: data.shipping_notes ?? null,
        items: enriched,
        subtotal_aed: subtotal,
        total_aed: subtotal,
        currency: "AED",
        status: "pending",
      })
      .select("order_number")
      .single();
    if (error) throw new Error("Failed to place order");
    return { order_number: inserted?.order_number ?? null, total_aed: subtotal };
  });
