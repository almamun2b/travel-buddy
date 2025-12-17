// import { ProfileContent } from "@/components/modules/Profile";
import { ProfileContent } from "@/components/modules/profile/ProfileContent";
import { me } from "@/services/auth/me";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile information.",
};
export const dynamic = "force-dynamic";
const ProfilePage = async () => {
  const res = await me();

  if (!res?.data?.email) {
    notFound();
  }

  return <ProfileContent user={res.data} />;
};

export default ProfilePage;
