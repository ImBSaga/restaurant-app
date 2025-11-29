import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderResponse,
} from "@/types/order.type";

const prefix = "/order";

// Create Order
export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateOrderResponse, Error, CreateOrderRequest>({
    mutationFn: async (params: CreateOrderRequest) => {
      const { data } = await api.post<CreateOrderResponse>(
        `${prefix}/checkout`,
        params
      );
      return data;
    },
    onSuccess: () => {
      // Automatically invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
}

// Get Order
export function useGetOrderQuery() {
  return useQuery<GetOrderResponse, Error>({
    queryKey: ["order"],
    queryFn: async () => {
      const { data } = await api.get<GetOrderResponse>(`${prefix}/my-order`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}
