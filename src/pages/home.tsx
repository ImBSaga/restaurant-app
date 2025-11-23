import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Shadcn UI
import { Button } from "../components/ui/button";

// Hooks
import { useRestaurantsQuery } from "@/services/queries/useRestaurant";

// Types
import type { AllRestaurant } from "@/types/restaurant.type";

export default function Home() {
  const navigate = useNavigate();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const handleAllRestaurant = () => {
    setSelectedCategory(1);
  };

  const { data: restaurants } = useRestaurantsQuery({
    page: 1,
    limit: 10,
  });

  return (
    <div className="space-y-12">
      {selectedCategory ? (
        <>
          <h1>All Restaurant</h1>
          <div>
            {restaurants?.data?.restaurants?.map(
              (restaurant: AllRestaurant) => (
                <div key={restaurant.id}>
                  <h2>{restaurant.name}</h2>
                  <p>{restaurant.place}</p>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <p
            onClick={() => {
              navigate("/auth");
            }}
          >
            Home
          </p>
          <Button onClick={handleAllRestaurant}>All Restaurant</Button>
        </>
      )}
    </div>
  );
}
