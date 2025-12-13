import {
  useGetCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveItemFromCartMutation,
  useDeleteCartMutation,
} from "@/services/queries/useCart";
import { Minus, Plus, Trash2, MapPin, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Cart, Item } from "@/types/cart.type";
import { paymentMethodData } from "@/constants/payment-method-data";
import { useState } from "react";
import { useCreateOrderMutation } from "@/services/queries/useOrder";
import { useSelector } from "react-redux";
import type { RootState } from "@/features/store";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cartData, isLoading } = useGetCartQuery();
  const { mutate: updateQuantity } = useUpdateCartQuantityMutation();
  const { mutate: removeItem } = useRemoveItemFromCartMutation();
  const { mutate: deleteCart } = useDeleteCartMutation();
  const { mutate: createOrder, isPending: isCreatingOrder } =
    useCreateOrderMutation();

  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [notes, setNotes] = useState("");

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

  const handleCheckout = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (!address) {
      alert("Please enter a delivery address");
      return;
    }

    const orderPayload = {
      restaurants: carts.map((cart) => ({
        restaurantId: cart.restaurant.id,
        items: cart.items.map((item) => ({
          menuId: item.menu.id,
          quantity: item.quantity,
        })),
      })),
      deliveryAddress: address,
      phone: phone,
      paymentMethod: selectedPaymentMethod,
      notes: notes,
    };

    createOrder(orderPayload, {
      onSuccess: (data) => {
        deleteCart();
        navigate("/success", {
          state: {
            order: data.data.transaction,
          },
        });
      },
      onError: (error) => {
        console.error("Checkout failed:", error);
        alert("Checkout failed. Please try again.");
      },
    });
  };

  return (
    <div className="mx-auto  px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Delivery Address
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                <Input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions?"
                  className="w-full pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
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

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethodData.map((method) => (
                <div
                  key={method.name}
                  onClick={() => setSelectedPaymentMethod(method.name)}
                  className={`cursor-pointer border rounded-lg p-4 flex items-center gap-4 transition-all ${
                    selectedPaymentMethod === method.name
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-12 h-8 flex items-center justify-center bg-white rounded border p-1">
                    <img
                      src={method.src}
                      alt={method.alt}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-700">
                    {method.name}
                  </span>
                  <div className="ml-auto">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPaymentMethod === method.name
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPaymentMethod === method.name && (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({summary?.totalItems})</span>
                <span>${summary?.totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${summary?.totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCreatingOrder}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isCreatingOrder ? "Processing..." : "Buy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
