// Base Type
export type PriceRange = {
  min: number;
  max: number;
};

export type Filters = {
  range: number;
  priceMin: number;
  priceMax: number;
  rating: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type SampleMenu = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

export type User = {
  id: number;
  name: string;
};

export type Menu = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

export type Coordinates = {
  lat: number;
  long: number;
};

// All Restaurant
export type AllRestaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
};

// Recommendation
export type Recommendation = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  sampleMenus: SampleMenu[];
  isFrequentlyOrdered: boolean;
};

// Get Restaurant Detail
export type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: User;
};

// Get All Restaurant
export type GetAllRestaurantResponse = {
  success: boolean;
  message: string;
  data: {
    restaurants: AllRestaurant[];
    pagination: Pagination;
    filters: Filters;
  };
};

// Get Recommended Restaurant
export type GetRecommendedRestaurantResponse = {
  success: boolean;
  message: string;
  data: {
    message: string;
    recommendations: Recommendation[];
  };
};

// Get Restaurant Detail
export type GetRestaurantDetailResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    star: number;
    averageRating: number;
    place: string;
    coordinates: Coordinates;
    logo: string;
    images: string[];
    totalMenus: number;
    totalReviews: number;
    menus: Menu[];
    reviews: Review[];
  };
};
