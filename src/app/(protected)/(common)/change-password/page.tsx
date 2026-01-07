import { ChangePasswordForm } from "@/components/modules/profile/ChangePasswordForm";
import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Change Password - Travel Buddy",
  description:
    "Securely update your Travel Buddy account password. Keep your travel profile protected with a strong password.",
};

const ChangePasswordPage = async () => {
  const res = await me();

  if (!res?.data?.email) {
    notFound();
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Change Password</h1>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border bg-card p-6">
          <h1 className="text-xl font-bold tracking-tight text-foreground text-center pb-4">
            Change Password
          </h1>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
