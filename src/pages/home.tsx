import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, MapPin } from "lucide-react";

// Shadcn UI
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

// Hooks
import {
  useRestaurantsQuery,
  useRecommendedRestaurantsQuery,
} from "@/services/queries/useRestaurant";

// Types
import type { AllRestaurant, Recommendation } from "@/types/restaurant.type";

export default function Home() {
  const navigate = useNavigate();

  const { searchTerm } = useOutletContext<{ searchTerm: string }>();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  useEffect(() => {
    if (searchTerm) {
      setSelectedCategory(1);
    }
  }, [searchTerm]);

  const handleAllRestaurant = () => {
    setSelectedCategory(1);
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  // All Restaurant
  const { data: restaurants } = useRestaurantsQuery({
    page: 1,
    limit: 10,
  });

  const filteredRestaurants = restaurants?.data?.restaurants?.filter((r) => {
    // Search filter
    const matchesSearch = r.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Price filter
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;
    const matchesPrice =
      (!min || r.priceRange.min >= min) && (!max || r.priceRange.max <= max);

    // Rating filter
    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((rating) => Math.floor(r.star) === rating);

    return matchesSearch && matchesPrice && matchesRating;
  });

  // Recommended Restaurant
  const { data: recommendedRestaurants, error } =
    useRecommendedRestaurantsQuery();

  return (
    <div className="space-y-8 pb-8">
      {selectedCategory ? (
        <section className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">All Restaurant</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <Card className="p-6 space-y-6 sticky top-4">
                {/* Price Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Price</h3>

                  <div className="space-y-2">
                    <Label htmlFor="min-price">Rp Minimum Price</Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-price">Rp Maximum Price</Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="1000000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Rating</h3>

                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingToggle(rating)}
                        />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center gap-1.5 cursor-pointer"
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{rating}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(minPrice || maxPrice || selectedRatings.length > 0) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                      setSelectedRatings([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Card>
            </aside>

            {/* Restaurant Grid */}
            <div className="flex-1">
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {filteredRestaurants?.map((restaurant: AllRestaurant) => (
                  <Card
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    className="flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    key={restaurant.id}
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {restaurant.name}
                      </h3>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                          <span className="font-medium">{restaurant.star}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{restaurant.place}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {filteredRestaurants?.length === 0 && (
                  <p className="text-muted-foreground col-span-full">
                    No restaurants found with the selected filters
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Recommended</h1>
            <Button
              onClick={handleAllRestaurant}
              variant="ghost"
              className="text-primary-100"
            >
              View All
            </Button>
          </div>

          {error ? (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
              {error.message.includes("401")
                ? "Please login to view recommended restaurants"
                : "Unable to load recommendations"}
            </div>
          ) : recommendedRestaurants?.data?.recommendations?.length === 0 ? (
            <p className="text-muted-foreground">
              No recommended restaurants found
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedRestaurants?.data?.recommendations?.map(
                (restaurant: Recommendation) => (
                  <Card
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    className="flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    key={restaurant.id}
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {restaurant.name}
                      </h3>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                          <span className="font-medium">{restaurant.star}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{restaurant.place}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
