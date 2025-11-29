import { useGetOrderQuery } from "@/services/queries/useOrder";
import type { Order, RestaurantOrder, Item } from "@/types/order.type";
import { Clock, MapPin } from "lucide-react";

export default function OrdersPage() {
  const { data: orderData, isLoading, error } = useGetOrderQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading orders. Please try again later.
      </div>
    );
  }

  const orders = orderData?.data?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
        <p className="text-gray-500">
          You haven't placed any orders yet. Start exploring!
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mx-auto  px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order: Order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 uppercase tracking-wide">
                  {order.status}
                </div>
              </div>
              <div className="font-mono text-sm text-gray-500">
                ID: {order.transactionId}
              </div>
            </div>

            <div className="p-6">
              {order.restaurants.map(
                (restaurant: RestaurantOrder, rIndex: number) => (
                  <div
                    key={rIndex}
                    className={rIndex > 0 ? "mt-6 pt-6 border-t" : ""}
                  >
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {restaurant.restaurantName}
                    </h3>
                    <div className="space-y-3 pl-6">
                      {restaurant.items.map((item: Item, iIndex: number) => (
                        <div
                          key={iIndex}
                          className="flex justify-between text-sm"
                        >
                          <div className="flex gap-2">
                            <span className="font-medium text-gray-900">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-600">
                              {item.menuName}
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(item.itemTotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              <div className="mt-6 pt-6 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Payment: {order.paymentMethod}
                </div>
                <div className="text-lg font-bold">
                  Total: {formatCurrency(order.pricing.totalPrice)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
