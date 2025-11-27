// Base Type
export type Restaurant = {
  id: number;
  name: string;
  logo: string;
};

export type Menu = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

export type Summary = {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
};

export type Item = {
  id: number;
  menu: Menu;
  quantity: number;
  itemTotal: number;
};

// Add Item to Cart
export type CartItem = {
  id: number;
  restaurant: Restaurant;
  menu: Menu;
  quantity: number;
  itemTotal: number;
};

// Get Cart
export type Cart = {
  restaurant: Restaurant;
  items: Item[];
  subtotal: number;
};

// Add Item to Cart
export type AddItemToCart = {
  restaurantId: number;
  menuId: number;
  quantity: number;
};
export type AddItemToCartResponse = {
  success: boolean;
  message: string;
  data: {
    cartItem: CartItem;
  };
};

// Get Cart
export type GetCartResponse = {
  success: boolean;
  message: string;
  data: {
    cart: Cart;
    summary: Summary;
  };
};

// Delete Cart
export type DeleteCartResponse = {
  success: boolean;
  message: string;
  data: null;
};

// Update Cart Quantity
export type UpdateCartQuantity = {
  id: number;
  quantity: number;
};
export type UpdateCartQuantityResponse = {
  success: boolean;
  message: string;
  data: {
    cartItem: CartItem;
  };
};

// Remove Item
export type RemoveItemFromCart = {
  success: boolean;
  message: string;
  data: null;
};
