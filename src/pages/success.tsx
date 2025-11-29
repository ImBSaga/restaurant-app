import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import type { Transaction } from "@/types/order.type";

export default function SuccessPage() {
  const location = useLocation();
  const order = location.state?.order as Transaction;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total items count
  const totalItems = order.restaurants.reduce(
    (acc, restaurant) =>
      acc + restaurant.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full  overflow-hidden">
        <div className="bg-blue-500 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Success</h1>
          <p className="text-blue-100">
            Your payment has been successfully processed.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Date */}
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-right">
              {formatDate(order.createdAt)}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium text-right">
              {order.paymentMethod}
            </span>
          </div>

          <div className="border-t border-dashed my-4"></div>

          {/* Price */}
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Price ({totalItems} items)</span>
            <span className="font-medium text-right">
              {formatCurrency(order.pricing.subtotal)}
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="font-medium text-right">
              {formatCurrency(order.pricing.deliveryFee)}
            </span>
          </div>

          {/* Service Fee */}
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Service Fee</span>
            <span className="font-medium text-right">
              {formatCurrency(order.pricing.serviceFee)}
            </span>
          </div>

          <div className="border-t my-4"></div>

          {/* Total */}
          <div className="flex justify-between items-start text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-600">
              {formatCurrency(order.pricing.totalPrice)}
            </span>
          </div>

          <Link
            to="/orders"
            className="block w-full bg-blue-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-8"
          >
            See My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
