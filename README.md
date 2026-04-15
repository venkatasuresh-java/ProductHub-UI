# ProductHub-UI

A modern, feature-rich React-based e-commerce frontend for managing and browsing products. ProductHub-UI provides an intuitive interface for product discovery, detailed product viewing, and product management capabilities.

## Overview

ProductHub-UI is a single-page application (SPA) built with React that communicates with a Spring Boot backend API. It allows users to:

- Browse a catalog of products
- Search and filter products
- View detailed product information
- Add new products to the catalog
- Update existing products
- Delete products from the catalog
- Manage product images

## Tech Stack

- **Frontend Framework**: React 19.2.5
- **Routing**: React Router 7.14
- **HTTP Client**: Axios 1.15.0
- **Styling**: Tailwind CSS 3.4.1 + PostCSS
- **Animations**: Framer Motion 12.38.0
- **Notifications**: React Hot Toast 2.6.0
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App (react-scripts 5.0.1)

## Project Structure

```
src/
├── api/                 # API integration (legacy)
├── components/          # Reusable components
│   ├── AddProduct.jsx
│   ├── DeleteProduct.jsx
│   ├── ProductDetails.jsx
│   ├── ProductList.jsx
│   ├── SearchBar.jsx
│   ├── UpdateProduct.jsx
│   └── Navbar.jsx
├── features/            # Feature-based modules
│   └── product/
│       ├── components/  # Product feature components
│       ├── pages/       # Product feature pages
│       ├── product.api.js      # Product API calls
│       └── product.hooks.js    # Custom hooks
├── layouts/             # Layout components
│   └── MainLayout.jsx
├── App.js              # Main app component
└── index.js            # Entry point
```

## Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ProductHub-UI
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

### `npm start`

Runs the app in development mode.

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes, and you'll see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

```bash
npm test
```

### `npm run build`

Builds the app for production to the `build` folder.

```bash
npm run build
```

The build is minified, and filenames include hashes for caching. Your app is ready for deployment!

### `npm run eject`

**Note: this is a one-way operation!**

Ejects from Create React App, giving you full control over configuration. Use only if you need custom webpack or build configurations.

## Key Features

### Product Listing
Browse all available products with a clean, responsive grid layout. Products display essential information including name, price, brand, and image.

### Product Search
Real-time search functionality to quickly find products by name or other attributes.

### Product Details
View comprehensive product information including:
- Product description
- Price and availability
- Stock quantity
- Brand information
- Product images

### Product Management
- **Add Products**: Create new products with details and images
- **Update Products**: Modify existing product information
- **Delete Products**: Remove products from the catalog

### Responsive Design
Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices.

### Smooth Animations
Enhanced user experience with Framer Motion animations for smooth transitions and interactions.

### Toast Notifications
User-friendly notifications for feedback on actions (success, error, loading states).

## API Integration

The application connects to a Spring Boot backend API that provides REST endpoints for:

- `GET /api/products` - Fetch all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/search` - Search products

See [API_SPEC.md](API_SPEC.md) for detailed API documentation.

## Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

- **Netlify**: Connect your GitHub repository to Netlify for automatic deployments
- **Vercel**: Deploy using Vercel CLI or GitHub integration
- **AWS S3 + CloudFront**: Upload build files to S3 and serve via CloudFront
- **Traditional Hosting**: Upload the `build` folder to any static hosting service

## Development Guidelines

### Component Structure
Components follow a modular structure with feature-based organization in the `features` folder and reusable components in the `components` folder.

### Styling
Uses Tailwind CSS for utility-first styling with custom PostCSS configuration.

### API Calls
API integration is handled through custom hooks in `features/product/product.hooks.js` and axios client in `features/product/product.api.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is private. Please contact the project owner for licensing information.
