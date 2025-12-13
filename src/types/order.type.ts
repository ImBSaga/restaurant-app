// Base Type
export type Pricing = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
};

export type Restaurant = {
  id: number;
  name: string;
  logo: string;
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

// Create Order
export type TransactionRestaurant = {
  restaurant: Restaurant;
  items: Item[];
  subtotal: number;
};
export type Transaction = {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: string;
  pricing: Pricing;
  restaurants: TransactionRestaurant[];
  createdAt: string;
};

// Create Order
export type CreateOrderRequestItem = {
  menuId: number;
  quantity: number;
};
export type CreateOrderRequestRestaurant = {
  restaurantId: number;
  items: CreateOrderRequestItem[];
};
export type CreateOrderRequest = {
  restaurants: CreateOrderRequestRestaurant[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes: string;
};
export type CreateOrderResponse = {
  success: boolean;
  message: string;
  data: {
    transaction: Transaction;
  };
};

// Get Order
export type GetOrderItem = Item & {
  image: string;
};
export type RestaurantOrder = {
  restaurant: Restaurant;
  items: GetOrderItem[];
  subtotal: number;
};
export type Order = {
  id: number;
  transactionId: string;
  status: string;
  paymentMethod: string;
  deliveryAddress: string;
  phone: string;
  pricing: Pricing;
  restaurants: RestaurantOrder[];
  createdAt: string;
  updatedAt: string;
};

// Get Order
export type GetOrderRequest = {
  status: string;
  page: number;
  limit: number;
};
export type GetOrderResponse = {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    pagination: Pagination;
    filter: Filter;
  };
};
