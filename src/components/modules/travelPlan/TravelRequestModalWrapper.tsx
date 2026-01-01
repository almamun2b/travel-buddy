'use client'

import { useEffect, useState } from "react";
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
        const response = await fetch('/api/v1/auth/me', {
          credentials: 'include',
          cache: 'no-store'
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
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
