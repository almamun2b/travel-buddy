import { VerifyEmailForm } from "@/components/modules/auth/VerifyEmailForm";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email || "";

  return (
    <div className="max-w-md mx-auto py-10">
      <VerifyEmailForm email={email} />
    </div>
  );
}
