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

export type SampleMenu = {
  id: number
  foodName: string
  price: number
  type: string
  image: string
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

// Recommendation
export type Recommendation = {
  id: number
  name: string
  star: number
  place: string
  logo: string
  images: string[]
  reviewCount: number
  sampleMenus: SampleMenu[]
  isFrequentlyOrdered: boolean
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

// Get Recommended Restaurant 
export type GetRecommendedRestaurantResponse = {
  success: boolean;
  message: string;
  data: {
    message: string
    recommendations: Recommendation[]
  };
};


