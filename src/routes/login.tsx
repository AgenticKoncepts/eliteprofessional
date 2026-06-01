import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/admin",
  }),
  head: () => ({ meta: [{ title: "Sign in — Elite Professional" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
      navigate({ to: redirect });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + redirect },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Check your email to confirm your account.");
    }
  };

  return (
    <Layout>
      <div className="container-elite py-16 max-w-md">
        <h1 className="font-display text-3xl mb-2">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "signin" ? "Admin and staff access." : "New accounts must be granted admin access separately."}
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] tracking-[0.2em] block mb-1.5 text-muted-foreground">EMAIL</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-border bg-background" />
          </div>
          <div>
            <label className="text-[11px] tracking-[0.2em] block mb-1.5 text-muted-foreground">PASSWORD</label>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-border bg-background" />
          </div>
          <button type="submit" disabled={busy} className="w-full px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] disabled:opacity-50">
            {busy ? "…" : mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="w-full text-xs text-muted-foreground hover:text-gold tracking-wider">
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
