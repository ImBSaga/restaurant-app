import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  AddItemToCartResponse,
  AddItemToCart,
  RemoveItemFromCart,
  UpdateCartQuantityResponse,
  GetCartResponse,
  UpdateCartQuantity,
  DeleteCartResponse,
  Item,
} from "@/types/cart.type";

const prefix = "/cart";
const CART_QUERY_KEY = ["cart"];

// Get Cart - Proper useQuery hook with caching
export function useGetCartQuery() {
  return useQuery<GetCartResponse, Error>({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<GetCartResponse>(`${prefix}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

// Add Item to Cart
export function useAddItemToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation<AddItemToCartResponse, Error, AddItemToCart>({
    mutationFn: async (params) => {
      const { data } = await api.post<AddItemToCartResponse>(
        `${prefix}`,
        params
      );
      return data;
    },
    onSuccess: () => {
      // Automatically invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

// Update Cart Quantity
export function useUpdateCartQuantityMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCartQuantityResponse,
    Error,
    UpdateCartQuantity,
    { previousCart: GetCartResponse | undefined }
  >({
    mutationFn: async (params) => {
      const { data } = await api.put<UpdateCartQuantityResponse>(
        `${prefix}/${params.id}`,
        { quantity: params.quantity }
      );
      return data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<GetCartResponse>(CART_QUERY_KEY);

      queryClient.setQueryData<GetCartResponse>(CART_QUERY_KEY, (old) => {
        if (!old?.data?.cart) return old;

        const newCart = JSON.parse(JSON.stringify(old));
        const carts = Array.isArray(newCart.data.cart)
          ? newCart.data.cart
          : [newCart.data.cart];

        for (const cart of carts) {
          const itemIndex = cart.items.findIndex(
            (item: Item) => item.id === variables.id
          );
          if (itemIndex !== -1) {
            const oldQuantity = cart.items[itemIndex].quantity;
            const diff = variables.quantity - oldQuantity;

            // Calculate unit price from total and quantity
            const unitPrice = cart.items[itemIndex].itemTotal / oldQuantity;

            cart.items[itemIndex].quantity = variables.quantity;
            cart.items[itemIndex].itemTotal = unitPrice * variables.quantity;

            // Update summary
            if (newCart.data.summary) {
              newCart.data.summary.totalItems += diff;
              newCart.data.summary.totalPrice += diff * unitPrice;
            }
            break;
          }
        }

        return newCart;
      });

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

// Remove Item
export function useRemoveItemFromCartMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    RemoveItemFromCart,
    Error,
    number,
    { previousCart: GetCartResponse | undefined }
  >({
    mutationFn: async (id) => {
      const { data } = await api.delete<RemoveItemFromCart>(`${prefix}/${id}`);
      return data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<GetCartResponse>(CART_QUERY_KEY);

      queryClient.setQueryData<GetCartResponse>(CART_QUERY_KEY, (old) => {
        if (!old?.data?.cart) return old;

        const newCart = JSON.parse(JSON.stringify(old));
        const carts = Array.isArray(newCart.data.cart)
          ? newCart.data.cart
          : [newCart.data.cart];

        for (const cart of carts) {
          const itemIndex = cart.items.findIndex(
            (item: Item) => item.id === id
          );
          if (itemIndex !== -1) {
            const item = cart.items[itemIndex];

            // Update summary
            if (newCart.data.summary) {
              newCart.data.summary.totalItems -= item.quantity;
              newCart.data.summary.totalPrice -= item.itemTotal;
            }

            cart.items.splice(itemIndex, 1);
            break;
          }
        }

        return newCart;
      });

      return { previousCart };
    },
    onError: (_err, _id, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

// Delete Cart
export function useDeleteCartMutation() {
  const queryClient = useQueryClient();

  return useMutation<DeleteCartResponse, Error>({
    mutationFn: async () => {
      const { data } = await api.delete<DeleteCartResponse>(`${prefix}`);
      return data;
    },
    onSuccess: () => {
      // Automatically invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}
