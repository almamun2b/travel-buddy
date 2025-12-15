"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicFormField } from "@/components/shared/DynamicFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { cn } from "@/lib/utils";
import { loginUser } from "@/services/auth/loginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, { error: "Password is too short" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data);
      if (res && res.success) {
        toast.success(res?.message || "Login successful");
        router.push("/");
      } else {
        if (res?.error?.statusCode === 403) {
          router.push(`/verify-email?email=${data.email}`);
        }
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DynamicFormField name="email" label="Email Address *">
              {(field) => (
                <Input {...field} placeholder="john@example.com" type="email" />
              )}
            </DynamicFormField>

            <DynamicFormField name="password" label="Password *">
              {(field) => <Password {...field} />}
            </DynamicFormField>

            <Button
              disabled={!form.formState.isValid || isLoading}
              type="submit"
              className="w-full"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
