import {
  useGetCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveItemFromCartMutation,
} from "@/services/queries/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Cart, Item } from "@/types/cart.type";

export default function CartPage() {
  const { data: cartData, isLoading } = useGetCartQuery();
  const { mutate: updateQuantity } = useUpdateCartQuantityMutation();
  const { mutate: removeItem } = useRemoveItemFromCartMutation();

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading cart...</div>;
  }

  const cart = cartData?.data?.cart;
  const summary = cartData?.data?.summary;

  // Handle both single object and array cases for cart
  const carts: Cart[] = cart ? (Array.isArray(cart) ? cart : [cart]) : [];

  const hasItems = carts.some((c) => c.items && c.items.length > 0);

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {carts.map((restaurantCart: Cart, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                <img
                  src={restaurantCart.restaurant.logo}
                  alt={restaurantCart.restaurant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h2 className="font-semibold text-lg">
                  {restaurantCart.restaurant.name}
                </h2>
              </div>

              <div className="space-y-4">
                {restaurantCart.items.map((item: Item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.menu.image}
                      alt={item.menu.foodName}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.menu.foodName}</h3>
                        <p className="font-semibold">${item.itemTotal}</p>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.menu.type}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                removeItem(item.id);
                              } else {
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity - 1,
                                });
                              }
                            }}
                            className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            }
                            className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Items ({summary?.totalItems})</span>
                <span>${summary?.totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${summary?.totalPrice}</span>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
