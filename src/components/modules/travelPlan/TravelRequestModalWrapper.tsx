'use client'

import { useEffect, useState } from "react";
import { $fetch } from "@/lib/fetch";
import TravelRequestModal from "./TravelRequestModal";

interface UserInfo {
  success: boolean;
  data?: {
    email: string;
  };
}

interface TravelRequestModalWrapperProps {
  travelPlanId: string;
}

export default function TravelRequestModalWrapper({ travelPlanId }: TravelRequestModalWrapperProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await $fetch.get<UserInfo>("/auth/me");
        
        if (data) {
          setUserInfo(data);
        } else {
          setUserInfo(null);
        }
      } catch {
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo?.data?.email) {
    return null;
  }

  return <TravelRequestModal travelPlanId={travelPlanId} />;
}
