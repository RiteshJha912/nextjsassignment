# MiniEcomBezt - A Minimal E-commerce Frontend  

## 🌍 View Live: [MiniEcomBezt](https://miniecombezt.vercel.app/)  

##  Project Overview  

This is a frontend e-commerce application built using **Next.js**, **TypeScript**, **TailwindCSS**, and **Zustand** for state management. The project follows a clean and modular architecture to ensure scalability and maintainability.  

This project was developed as part of an assessment requiring the implementation of a mobile-first UI based on a **Figma design**. It fetches product data from a **dummy API** and allows users to view product listings and details.  

## Stack  

- **Framework**: [Next.js](https://nextjs.org/)  
- **Styling**: [TailwindCSS](https://tailwindcss.com/)  
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)  
- **Icons**: [Lucide Icons](https://lucide.dev/icons)  
- **Font**: Lato  


## Project Structure 
```
root/  
├── app/  
│    ├── products/  
│    │     ├── [id]/                # Dynamic route for product details  
│    │     │   └── page.tsx         # Individual product page  
│    │     └── page.tsx             # Main products listing page  
│    ├── favicon.ico                # Favicon for the app  
│    ├── globals.css                # Global styles  
│    ├── layout.tsx                 # Root layout for the app  
│    └── page.tsx                    # Home page  
├── components/                      # Reusable UI components  
│    ├── CategoryTabs.jsx           # Category navigation tabs  
│    ├── ProductCard.jsx            # Product display card  
│    └── Toast.jsx                   # Toast notification component  
├── public/                          # Static assets (images, icons, etc.)  
├── services/                        # API and data fetching services  
│    └── api.ts                      # API service functions  
├── store/                           # State management (Zustand or similar)  
│    └── useStore.ts                 # Centralized store logic  
├── types/                           # Type definitions for TypeScript  
│    └── index.ts                     # Global types  
└── Rest of the files               # Other necessary configurations, dependencies, etc.
```

##  Features  

✅ **Product Listing Page** (`/products`)  
- Displays product categories and a list of items fetched from the API.  
- Clicking on a product navigates to its **detailed view**.  

✅ **Product Detail Page** (`/products/[id]`)  
- Shows detailed information about the selected product.  
- Allows users to **adjust item quantity**.  
- A "Back" button returns to the product listing page.  
- Clicking "Add to Cart" triggers a **toast notification** (Cart functionality is not implemented).  

✅ **Reusable Components**  
- **CategoryTabs**: Enables easy category navigation.  
- **ProductCard**: Displays product details in a card format.  
- **Toast Notification**: Provides feedback when adding items to the cart.  



## 🏗️ Getting Started  

Follow these steps to set up the project locally.  

### 1️⃣ Install Dependencies  

```bash
npm install
# or
yarn install
```

Run the Development Server

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 📖 Additional Resources
Figma Design:  [View here](https://www.figma.com/design/suuDUPDXOYsCvQWXNNFebq/Untitled?node-id=0-1&t=MCffsBH1WFo6BAkf-1)  
Dummy API Docs:  [dummyjson.com](https://dummyjson.com/docs/products)  
