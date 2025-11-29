// Base Type
export type User = {
  id: number;
  name: string;
};

export type Restaurant = {
  id: number;
  name: string;
};

export type Item = {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Filter = {
  status: string;
};

export type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
};

// Create Review
export type CreateReview = Review & {
  user: User;
  restaurant: Restaurant;
};
export type CreateReviewRequest = {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
};
export type CreateReviewResponse = {
  success: boolean;
  message: string;
  data: {
    review: CreateReview;
  };
};

// Get My Reviews
export type MyRestaurant = Restaurant & {
  logo: string;
};
export type MyReview = Review & {
  restaurant: MyRestaurant;
};
export type GetMyReviewsRequest = {
  page: number;
  limit: number;
};
export type GetMyReviewsResponse = {
  success: boolean;
  message: string;
  data: {
    reviews: MyReview[];
    pagination: Pagination;
  };
};

// Update Review
export type UpdateReview = Review & {
  updatedAt: string;
  restaurant: Restaurant;
};
export type UpdateReviewRequest = {
  id: number;
  star: number;
  comment: string;
};
export type UpdateReviewResponse = {
  success: boolean;
  message: string;
  data: {
    review: MyReview;
  };
};
