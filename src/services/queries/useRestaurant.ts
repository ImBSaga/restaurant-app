import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  GetAllRestaurantResponse,
  GetRecommendedRestaurantResponse,
  GetRestaurantDetailResponse,
} from "@/types/restaurant.type";

const prefix = "/resto";

// All Restaurant
export function useRestaurantsQuery(params?: {
  page?: number;
  limit?: number;
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
}) {
  return useQuery<GetAllRestaurantResponse>({
    queryKey: ["restaurants", "all", params],
    queryFn: async () => {
      const { data } = await api.get(`${prefix}`, { params });
      return data;
    },
    staleTime: 60_000,
  });
}

// Recommended Restaurant
export function useRecommendedRestaurantsQuery() {
  return useQuery<GetRecommendedRestaurantResponse>({
    queryKey: ["restaurants", "recommended"],
    queryFn: async () => {
      const { data } = await api.get(`${prefix}/recommended`);
      return data;
    },
    retry: false,
    staleTime: 60_000,
  });
}

// Restaurant Detail
export function useRestaurantDetailQuery(id: number) {
  return useQuery<GetRestaurantDetailResponse>({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const { data } = await api.get(`${prefix}/${id}`);
      return data;
    },
    retry: false,
    staleTime: 60_000,
  });
}
