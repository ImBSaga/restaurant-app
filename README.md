# 🍽️ Restaurant App

A modern, full-featured restaurant discovery and food ordering application built with React, TypeScript, and Vite. Browse restaurants, explore menus, manage your cart, and place orders with a seamless user experience.

## ✨ Features

### 🔍 Restaurant Discovery

- **Smart Search**: Search restaurants by name with real-time filtering
- **Advanced Filters**: Filter by price range and star ratings
- **Personalized Recommendations**: Get AI-powered restaurant recommendations based on your preferences
- **Detailed Restaurant Pages**: View comprehensive restaurant information, menus, and ratings

### 🛒 Shopping Experience

- **Interactive Cart**: Add items to cart with quantity management
- **Multi-Restaurant Orders**: Order from multiple restaurants in a single checkout
- **Real-time Updates**: Cart automatically updates with item totals and summaries
- **Persistent Cart**: Cart data persists across sessions using Redux Persist

### 💳 Checkout & Payments

- **Multiple Payment Methods**: Support for various payment options (Credit Card, Debit Card, E-Wallet, etc.)
- **Delivery Management**: Enter delivery address and contact information
- **Order Notes**: Add special instructions for your order
- **Order Summary**: Clear breakdown of items, fees, and total cost

### 👤 User Management

- **Authentication**: Secure login and registration system
- **User Profiles**: Manage personal information and preferences
- **Order History**: Track all your past orders with detailed information
- **Order Status**: Real-time order status updates

### 🎨 Modern UI/UX

- **Responsive Design**: Fully responsive across all device sizes
- **Shadcn UI Components**: Beautiful, accessible components built with Radix UI
- **TailwindCSS**: Modern utility-first styling
- **Smooth Animations**: Polished interactions and transitions
- **Dark Mode Ready**: Built with theming support

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework

### State Management

- **Redux Toolkit** - Efficient state management
- **Redux Persist** - Persist and rehydrate state
- **TanStack Query (React Query)** - Server state management and caching

### UI Components

- **Shadcn UI** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variant management

### Form Management

- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### HTTP Client

- **Axios** - Promise-based HTTP client

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd restaurant-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your API base URL:

   ```env
   VITE_API_BASE_URL=https://your_api_url_here
   ```

## 🚀 Running the App

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
restaurant-app/
├── public/              # Static assets
├── src/
│   ├── app/            # App configuration and entry point
│   │   ├── app.tsx     # Main app component with routing
│   │   ├── layout.tsx  # App layout wrapper
│   │   └── main.tsx    # App entry point
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Shadcn UI components
│   ├── constants/      # App constants and static data
│   ├── features/       # Redux slices and store configuration
│   ├── lib/            # Utility functions and helpers
│   ├── pages/          # Page components
│   │   ├── auth.tsx           # Authentication page
│   │   ├── home.tsx           # Home page with restaurant listings
│   │   ├── restaurant-detail.tsx  # Restaurant details
│   │   ├── cart.tsx           # Shopping cart
│   │   ├── checkout.tsx       # Checkout page
│   │   ├── orders.tsx         # Order history
│   │   ├── profile.tsx        # User profile
│   │   └── success.tsx        # Order success page
│   ├── services/       # API services and React Query hooks
│   │   ├── api/        # API client configuration
│   │   └── queries/    # React Query hooks
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
├── .env.example        # Environment variables template
├── components.json     # Shadcn UI configuration
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🎯 Usage

### Browse Restaurants

1. Visit the home page to see recommended restaurants
2. Click "View All" to browse all available restaurants
3. Use the search bar to find specific restaurants
4. Apply filters for price range and ratings

### Place an Order

1. Click on a restaurant to view its menu
2. Add items to your cart with desired quantities
3. Navigate to the cart to review your order
4. Proceed to checkout
5. Enter delivery details and select payment method
6. Confirm your order

### Manage Your Account

1. Register or login to access personalized features
2. View your profile information
3. Check order history and status
4. Update your preferences

## 🔧 Configuration

### Shadcn UI Components

Components are configured in `components.json`. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

### TailwindCSS

Tailwind configuration is integrated with Vite. Custom styles can be added in `src/styles/`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [TailwindCSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the icon library
