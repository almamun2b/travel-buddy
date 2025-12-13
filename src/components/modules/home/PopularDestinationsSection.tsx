import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PopularDestinationsSection = () => {
  const destinations = [
    {
      name: "Bali, Indonesia",
      travelers: 1234,
      image: "🏝️",
      color: "from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700",
    },
    {
      name: "Paris, France",
      travelers: 2156,
      image: "🗼",
      color:
        "from-pink-400 to-purple-500 dark:from-pink-600 dark:to-purple-700",
    },
    {
      name: "Tokyo, Japan",
      travelers: 1876,
      image: "🗾",
      color: "from-red-400 to-pink-500 dark:from-red-600 dark:to-pink-700",
    },
    {
      name: "New York, USA",
      travelers: 1543,
      image: "🗽",
      color:
        "from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700",
    },
    {
      name: "Dubai, UAE",
      travelers: 1392,
      image: "🏙️",
      color:
        "from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-700",
    },
    {
      name: "Barcelona, Spain",
      travelers: 1687,
      image: "🏖️",
      color: "from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Explore</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover where travelers are heading next
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden group"
            >
              <div
                className={`h-48 bg-gradient-to-br ${dest.color} flex items-center justify-center text-6xl relative`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity"></div>
                {dest.image}
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{dest.name}</span>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;
