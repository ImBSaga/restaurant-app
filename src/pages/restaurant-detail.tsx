import { useParams } from "react-router-dom";
import { useRestaurantDetailQuery } from "@/services/queries/useRestaurant";

export default function RestaurantDetail() {
  const { id } = useParams();

  // Restaurant Detail
  const { data: restaurantDetail } = useRestaurantDetailQuery(Number(id));

  return (
    <div>
      <h1>Restaurant Detail </h1>

      <h3>{restaurantDetail?.data?.name}</h3>
    </div>
  );
}
