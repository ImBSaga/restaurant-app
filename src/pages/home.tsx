import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

// Shadcn UI
import { Button } from "../components/ui/button";

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

  useEffect(() => {
    if (searchTerm) {
      setSelectedCategory(1);
    }
  }, [searchTerm]);

  const handleAllRestaurant = () => {
    setSelectedCategory(1);
  };

  // All Restaurant
  const { data: restaurants } = useRestaurantsQuery({
    page: 1,
    limit: 10,
  });

  const filteredRestaurants = restaurants?.data?.restaurants?.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Recommended Restaurant
  const { data: recommendedRestaurants, error } =
    useRecommendedRestaurantsQuery();

  return (
    <div className="space-y-12">
      {selectedCategory ? (
        <>
          <h1>All Restaurant</h1>

          <div>
            {filteredRestaurants?.map((restaurant: AllRestaurant) => (
              <div
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="flex flex-col gap-2 border"
                key={restaurant.id}
              >
                <h2>{restaurant.name}</h2>
                <p>{restaurant.place}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Home</p>

          <Button onClick={handleAllRestaurant}>All Restaurant</Button>

          <p>Recommended</p>
          {error ? (
            <p>
              {error.message === "Request failed with status code 401"
                ? "Login to see recommended restaurants"
                : "Something went wrong"}
            </p>
          ) : recommendedRestaurants?.data?.recommendations?.length === 0 ? (
            <p>No recommended restaurants found</p>
          ) : (
            <div>
              {recommendedRestaurants?.data?.recommendations?.map(
                (restaurant: Recommendation) => (
                  <div
                    className="flex flex-col gap-2 border"
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    key={restaurant.id}
                  >
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.place}</p>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
