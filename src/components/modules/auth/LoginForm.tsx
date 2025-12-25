"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { cn } from "@/lib/utils";
import { loginAction, type LoginActionState } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginActionState, FormData>(
    loginAction,
    undefined
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login successful");
      return;
    }
    if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6")}> 
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form action={action} className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address *</label>
          <Input name="email" placeholder="john@example.com" type="email" />
          {state?.fieldErrors?.email ? (
            <p className="text-sm text-destructive">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password *</label>
          <Password name="password" />
          {state?.fieldErrors?.password ? (
            <p className="text-sm text-destructive">{state.fieldErrors.password}</p>
          ) : null}
        </div>

        <Button disabled={pending} type="submit" className="w-full">
          {pending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
