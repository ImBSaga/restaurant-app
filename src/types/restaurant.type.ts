// Base Type
export type PriceRange = {
  min: number
  max: number
}

export type Filters = {
  range: number
  priceMin: number
  priceMax: number
  rating: number
}

export type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

// All Restaurant
export type AllRestaurant = {
  id: number
  name: string
  star: number
  place: string
  logo: string
  images: string[]
  reviewCount: number
  menuCount: number
  priceRange: PriceRange
}

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


