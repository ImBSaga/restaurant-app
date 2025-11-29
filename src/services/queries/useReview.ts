import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  CreateReviewRequest,
  CreateReviewResponse,
  GetMyReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from "@/types/review.type";

const prefix = "/review";

// Create Review
export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateReviewResponse, Error, CreateReviewRequest>({
    mutationFn: async (params: CreateReviewRequest) => {
      const { data } = await api.post<CreateReviewResponse>(prefix, params);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
  });
}

// Get My Reviews
export function useGetMyReviewsQuery(page = 1, limit = 100) {
  return useQuery<GetMyReviewsResponse, Error>({
    queryKey: ["my-reviews", page, limit],
    queryFn: async () => {
      const { data } = await api.get<GetMyReviewsResponse>(
        `${prefix}/my-reviews`,
        {
          params: { page, limit },
        }
      );
      return data;
    },
  });
}

// Update Review
export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdateReviewResponse, Error, UpdateReviewRequest>({
    mutationFn: async ({ id, ...params }: UpdateReviewRequest) => {
      const { data } = await api.put<UpdateReviewResponse>(
        `${prefix}/${id}`,
        params
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
  });
}
