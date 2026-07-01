import { createFileRoute, Outlet, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { assertAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Elite Professional" }, { name: "robots", content: "noindex,nofollow" }] }),
  ssr: false,
  beforeLoad: async () => {
    try {
      await assertAdmin();
    } catch (err) {
      const status = err instanceof Response ? err.status : 0;
      if (status === 401) {
        throw redirect({ to: "/login", search: { redirect: "/admin" } });
      }
      if (status === 403) {
        // Let the component render the "not authorised" UI.
        return;
      }
      throw err;
    }
  },
  component: AdminGate,
});

type State = "loading" | "anon" | "not-admin" | "admin";

function AdminGate() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        if (!cancelled) setState("anon");
        return;
      }
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      setState(roleData ? "admin" : "not-admin");
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => { cancelled = true; sub.subscription.unsubscribe(); };
  }, []);

  if (state === "loading") {
    return <Layout><div className="container-elite py-20 text-center text-sm text-muted-foreground">Checking access…</div></Layout>;
  }
  if (state === "anon") {
    return (
      <Layout>
        <div className="container-elite py-20 max-w-md text-center">
          <h1 className="font-display text-2xl mb-3">Admin access</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to manage the catalogue.</p>
          <button onClick={() => navigate({ to: "/login", search: { redirect: "/admin" } })} className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em]">SIGN IN</button>
        </div>
      </Layout>
    );
  }
  if (state === "not-admin") {
    return (
      <Layout>
        <div className="container-elite py-20 max-w-md text-center">
          <h1 className="font-display text-2xl mb-3">Not authorised</h1>
          <p className="text-sm text-muted-foreground mb-6">Your account does not have admin access.</p>
          <button onClick={async () => { await supabase.auth.signOut(); }} className="text-xs tracking-[0.25em] underline">SIGN OUT</button>
          <div className="mt-6"><Link to="/" className="text-xs text-muted-foreground hover:text-gold tracking-wider">← BACK TO STORE</Link></div>
        </div>
      </Layout>
    );
  }
  return <Outlet />;
}
