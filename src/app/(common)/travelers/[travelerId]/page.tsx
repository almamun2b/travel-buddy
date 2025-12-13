/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicProfile } from "@/services/user/getPublicProfile";
interface TravelerDetailPageProps {
  params: Promise<{ travelerId: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ travelerId: string }>;
}) => {
  const { travelerId } = await params;
  const data = await getPublicProfile({ id: travelerId });

  return {
    title: data.data?.fullName ?? "Traveler Profile",
    description: data.data?.bio ?? "Traveler profile",
  };
};

const TravelerDetailPage = async ({ params }: TravelerDetailPageProps) => {
  const { travelerId } = await params;

  const result = await getPublicProfile({ id: travelerId });
  const traveler = result.data;

  if (!traveler) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Traveler not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 pt-32 h-full">
      <Card className="border rounded-2xl shadow-sm">
        <CardContent className="pt-6 space-y-6">
          {/* Top section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={traveler.avatar ?? undefined} />
              <AvatarFallback>
                {traveler.fullName?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                {traveler.fullName}
                {traveler.hasVerifiedBadge && (
                  <Badge className="bg-blue-600 text-white">Verified</Badge>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                Joined: {new Date(traveler.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Bio */}
          {traveler.bio && (
            <div>
              <h2 className="font-medium mb-2">Bio</h2>
              <p className="text-muted-foreground">{traveler.bio}</p>
            </div>
          )}

          {/* Current location */}
          <div>
            <h2 className="font-medium mb-2">Current Location</h2>
            <p className="text-muted-foreground">
              {traveler.currentLocation || "Not provided"}
            </p>
          </div>

          {/* Travel Interests */}
          <div>
            <h2 className="font-medium mb-2">Travel Interests</h2>
            <div className="flex flex-wrap gap-2">
              {traveler.travelInterests?.length > 0 ? (
                traveler.travelInterests.map((interest: any) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="px-3 py-1 rounded-full"
                  >
                    {interest}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No interests listed.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerDetailPage;
