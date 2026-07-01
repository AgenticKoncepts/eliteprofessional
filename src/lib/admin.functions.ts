import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/lib/admin-middleware";

/**
 * Server-side admin check. Throws 401/403 Response when caller is not an
 * authenticated admin. Returns { ok: true, userId } otherwise.
 */
export const assertAdmin = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    return { ok: true as const, userId: context.userId };
  });
