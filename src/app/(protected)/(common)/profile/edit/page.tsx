/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateProfileForm } from "@/components/modules/profile/EditProfileForm";
import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your profile information.",
};

const EditProfilePage = async () => {
  const res = (await me()) as any;

  if (!res?.data?.email) {
    notFound();
  }

  return <UpdateProfileForm user={res?.data} />;
};

export default EditProfilePage;
