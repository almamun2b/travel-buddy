import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories - Travel Buddy",
  description:
    "Read inspiring travel stories from Travel Buddy users who found amazing companions and created unforgettable memories.",
};

export default function Stories() {
  return (
    <ComingSoon
      title="Success Stories"
      description="We're collecting amazing travel stories from our community. Soon you'll be able to read about real adventures, friendships formed, and incredible journeys made possible through Travel Buddy connections."
    />
  );
}
