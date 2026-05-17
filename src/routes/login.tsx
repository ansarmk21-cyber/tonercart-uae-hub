import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Tonercart UAE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <div className="container-page py-16 max-w-md mx-auto">
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex gap-2 p-1 rounded-md bg-muted mb-6">
          <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded text-sm font-semibold ${mode === "login" ? "bg-card shadow text-secondary" : "text-muted-foreground"}`}>Sign in</button>
          <button onClick={() => setMode("register")} className={`flex-1 py-2 rounded text-sm font-semibold ${mode === "register" ? "bg-card shadow text-secondary" : "text-muted-foreground"}`}>Register</button>
        </div>
        <h1 className="text-2xl font-bold text-secondary">{mode === "login" ? "Welcome back" : "Create an account"}</h1>
        <p className="text-sm text-muted-foreground mt-1">{mode === "login" ? "Sign in to track orders and view invoices." : "Open a business account for VAT invoicing & bulk pricing."}</p>

        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Connect Lovable Cloud to enable real authentication."); }}>
          {mode === "register" && (
            <Field label="Full name" required name="name" />
          )}
          <Field label="Email" required type="email" name="email" />
          <Field label="Password" required type="password" name="password" />
          {mode === "register" && (
            <Field label="Company (optional)" name="company" />
          )}
          <Button type="submit" size="lg" className="w-full">{mode === "login" ? "Sign in" : "Create account"}</Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          By continuing you agree to our <Link to="/terms" className="text-primary">Terms</Link> &{" "}
          <Link to="/privacy" className="text-primary">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}{rest.required && " *"}</span>
      <input {...rest} className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
