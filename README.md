## View Live here : https://miniecombezt.vercel.app/products/2
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

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
