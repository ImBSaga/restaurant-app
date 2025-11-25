import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import type { RootState } from "@/features/store";

// Shadcn UI
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

// Hooks
import {
  useRestaurantsQuery,
  useRecommendedRestaurantsQuery,
} from "@/services/queries/useRestaurant";

// Types
import type { AllRestaurant, Recommendation } from "@/types/restaurant.type";

export default function Home() {
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const handleAllRestaurant = () => {
    setSelectedCategory(1);
  };
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className="space-y-12">
      {selectedCategory ? (
        <>
          <h1>All Restaurant</h1>
          <div>
            {filteredRestaurants?.map((restaurant: AllRestaurant) => (
              <div className="flex flex-col gap-2 border" key={restaurant.id}>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.place}</p>
              </div>
            ))}
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
          <Input
            placeholder="Search restaurants..."
            className="pl-10"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSelectedCategory(1);
                setSearchTerm(inputValue);
              }
            }}
          />

          <Button onClick={handleAllRestaurant}>All Restaurant</Button>

          {user && <Button onClick={handleLogout}>Logout</Button>}

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
