import { useParams } from "react-router-dom";
import { useRestaurantDetailQuery } from "@/services/queries/useRestaurant";
import type { Menu, Review } from "@/types/restaurant.type";
import { useState } from "react";
import {
  useAddItemToCartMutation,
  useGetCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveItemFromCartMutation,
} from "@/services/queries/useCart";
import { Plus, Minus } from "lucide-react";
import type { Item } from "@/types/cart.type";

export default function RestaurantDetail() {
  const { id } = useParams();

  // Restaurant Detail
  const { data: restaurantDetail } = useRestaurantDetailQuery(Number(id));

  const [filter, setFilter] = useState<string>("");

  // Cart Details - Now using proper useQuery hook
  const { data: cartData } = useGetCartQuery();
  const { mutate: addItemToCart } = useAddItemToCartMutation();
  const { mutate: updateCartQuantity } = useUpdateCartQuantityMutation();
  const { mutate: removeItemFromCart } = useRemoveItemFromCartMutation();

  // Helper function to find if menu is in cart
  const getCartItem = (menuId: number): Item | undefined => {
    const cart = cartData?.data?.cart;
    if (!cart) return undefined;

    if (Array.isArray(cart)) {
      for (const c of cart) {
        const item = c.items?.find((item: Item) => item.menu.id === menuId);
        if (item) return item;
      }
      return undefined;
    }

    return cart.items?.find((item: Item) => item.menu.id === menuId);
  };

  // Handle add to cart
  const handleAddToCart = (menuId: number) => {
    if (!restaurantDetail?.data.id) return;

    addItemToCart({
      menuId,
      quantity: 1,
      restaurantId: restaurantDetail.data.id,
    });
  };

  // Handle increase quantity
  const handleIncrease = (cartItemId: number, currentQuantity: number) => {
    updateCartQuantity({
      id: cartItemId,
      quantity: currentQuantity + 1,
    });
  };

  // Handle decrease quantity
  const handleDecrease = (cartItemId: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      removeItemFromCart(cartItemId);
    } else {
      updateCartQuantity({
        id: cartItemId,
        quantity: currentQuantity - 1,
      });
    }
  };

  return (
    <div className="mx-auto px-4">
      {/* Header with Cart Icon */}
      <h3 className="text-xl font-semibold mb-4 mt-6">
        {restaurantDetail?.data?.name}
      </h3>

      <h2 className="text-lg font-semibold mb-2">Menus</h2>
      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("")}
          className={`px-4 py-2 border rounded-full whitespace-nowrap transition-all ${
            filter === ""
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-300 hover:border-blue-300"
          }`}
        >
          All Menu
        </button>
        {restaurantDetail?.data?.menus
          ?.map((menu: Menu) => menu.type)
          .filter(
            (type: string, index: number) =>
              restaurantDetail?.data?.menus
                ?.map((menu: Menu) => menu.type)
                .indexOf(type) === index
          )
          .map((type: string) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 border rounded-full whitespace-nowrap transition-all ${
                filter === type
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              {type}
            </button>
          ))}
      </div>

      {/* Menu Items */}
      <div className="grid gap-4 pb-8">
        {restaurantDetail?.data?.menus
          ?.filter((menu: Menu) => menu.type === filter || !filter)
          .map((menu: Menu) => {
            const cartItem = getCartItem(menu.id);
            const quantity = cartItem?.quantity || 0;
            const isInCart = quantity > 0;

            return (
              <div
                key={menu.id}
                className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex gap-4 flex-1">
                  <img
                    src={menu.image}
                    alt={menu.foodName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{menu.foodName}</h3>
                    <p className="text-gray-500 text-sm">{menu.type}</p>
                    <p className="font-bold text-green-600 text-lg mt-1">
                      Rp. {menu.price}
                    </p>
                  </div>
                </div>

                {/* Dynamic Button */}
                <div className="ml-4">
                  {!isInCart ? (
                    <button
                      onClick={() => handleAddToCart(menu.id)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all font-medium whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrease(cartItem!.id, quantity)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-red-500 rounded-md hover:bg-red-50 active:scale-95 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg min-w-[2.5rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(cartItem!.id, quantity)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-green-500 rounded-md hover:bg-green-50 active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Reviews */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Reviews</h2>
      <div className="grid gap-4 pb-8">
        {restaurantDetail?.data?.reviews?.map((review: Review) => (
          <div key={review.id} className="border rounded-lg p-4 bg-white">
            <h3 className="font-semibold">{review.user.name}</h3>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            <p className="text-yellow-500 mt-2">⭐ {review.star}</p>
            <p className="text-gray-500 text-sm mt-1">{review.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
