/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { sendTravelRequest } from "@/services/travelPlans/sendTravelRequest";
import {
  CalendarDays,
  DollarSign,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TravelRequestModal from "./TravelRequestModal";

export function TravelPlanCard({
  travelPlan,
  userInfo,
}: {
  travelPlan: any;
  userInfo: any;
}) {
  const {
    id,
    title,
    description,
    destination,
    startDate,
    endDate,
    budget,
    travelType,
    maxMembers,
    activities,
    images,
    status,
    creator,
  } = travelPlan;

  const firstImage = images?.[0];

  const formattedStart = new Date(startDate).toLocaleDateString();
  const formattedEnd = new Date(endDate).toLocaleDateString();

  const requestToJoin = async () => {
    const res = sendTravelRequest({ travelPlanId: "id", message: "sd" });
  };

  return (
    <Card className="overflow-hidden border rounded-xl shadow-sm hover:shadow-lg transition bg-card ">
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        <Image src={firstImage} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge
            variant={status === "OPEN" ? "default" : "secondary"}
            className="uppercase"
          >
            {status}
          </Badge>
          <Badge>{travelType}</Badge>
        </div>
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          {userInfo?.data?.email && <TravelRequestModal travelPlanId={id} />}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 grow">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} />
          <span>{destination}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={16} />
          <span>
            {formattedStart} → {formattedEnd}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={16} />
          <span>{budget} BDT</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users size={16} />
          <span>Max Members: {maxMembers}</span>
        </div>

        {/* Activities */}
        {activities?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activities.map((a: string, i: number) => (
              <Badge key={i} variant="outline" className="text-xs">
                {a}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Creator */}
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={creator.avatar} />
            <AvatarFallback>
              {creator.fullName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium flex items-center gap-1">
              {creator.fullName}
              {creator.hasVerifiedBadge && (
                <ShieldCheck className="text-blue-500" size={16} />
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {creator.isVerified ? "Verified" : "Unverified"}
            </p>
          </div>
        </div>

        <Link
          href={`/travel-plan/${id}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
