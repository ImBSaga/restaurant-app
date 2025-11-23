import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import type { GetAllRestaurantResponse } from '@/types/restaurant.type';

const prefix = 'resto';

export function useRestaurantsQuery(params?: {
    page?: number;
    limit?: number;
    location?: string;
    range?: number;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
}) {
    return useQuery<GetAllRestaurantResponse>( {
        queryKey: [prefix, 'all', params],
        queryFn: async () => {
            const { data } = await api.get(`/${prefix}`, { params });
            return data;
        },
        staleTime: 60_000,
    });
}