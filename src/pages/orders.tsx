import { useGetOrderQuery } from "@/services/queries/useOrder";
import {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
} from "@/services/queries/useReview";
import type { Order, RestaurantOrder, Item } from "@/types/order.type";
import type { MyReview } from "@/types/review.type";
import { Clock, MapPin, Star } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export default function OrdersPage() {
  const { data: orderData, isLoading, error } = useGetOrderQuery();
  const { data: reviewsData } = useGetMyReviewsQuery();
  const { mutate: createReview, isPending: isCreating } =
    useCreateReviewMutation();
  const { mutate: updateReview, isPending: isUpdating } =
    useUpdateReviewMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReviewData, setSelectedReviewData] = useState<{
    transactionId: string;
    restaurantId: number;
    existingReview?: MyReview;
  } | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const myReviews = reviewsData?.data?.reviews || [];

  const getReviewForRestaurant = (restaurantId: number) => {
    return myReviews.find((r) => r.restaurant.id === restaurantId);
  };

  const handleOpenReview = (
    transactionId: string,
    restaurantId: number,
    existingReview?: MyReview
  ) => {
    setSelectedReviewData({ transactionId, restaurantId, existingReview });
    if (existingReview) {
      setRating(existingReview.star);
      setComment(existingReview.comment);
    } else {
      setRating(0);
      setComment("");
    }
    setDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!selectedReviewData) return;
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (selectedReviewData.existingReview) {
      updateReview(
        {
          id: selectedReviewData.existingReview.id,
          star: rating,
          comment,
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
          },
        }
      );
    } else {
      createReview(
        {
          transactionId: selectedReviewData.transactionId,
          restaurantId: selectedReviewData.restaurantId,
          star: rating,
          comment,
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
          },
        }
      );
    }
  };

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
    <div className="mx-auto px-4 py-8">
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
                (restaurant: RestaurantOrder, rIndex: number) => {
                  const existingReview = getReviewForRestaurant(
                    restaurant.restaurantId
                  );
                  return (
                    <div
                      key={rIndex}
                      className={rIndex > 0 ? "mt-6 pt-6 border-t" : ""}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {restaurant.restaurantName}
                        </h3>
                        <button
                          onClick={() =>
                            handleOpenReview(
                              order.transactionId,
                              restaurant.restaurantId,
                              existingReview
                            )
                          }
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {existingReview ? "Update Review" : "Give Review"}
                        </button>
                      </div>
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
                  );
                }
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedReviewData?.existingReview
                ? "Update Review"
                : "Give Review"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <div className="flex flex-col gap-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Give Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please share your thoughts about our service!"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={handleSubmitReview}
              disabled={isCreating || isUpdating}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
            >
              {isCreating || isUpdating ? "Sending..." : "Send"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
