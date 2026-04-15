// ProductList.jsx

import ProductCard from "./ProductCard";

/*
  ProductList Component

  Props:
  - products → array of product objects
  - loading → boolean
  - error → error message
*/
const ProductList = ({ products, loading, error }) => {

  /*
    Loading state
  */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-indigo-500"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin animation-delay-75"></div>
        </div>
      </div>
    );
  }

  /*
    Error state
  */
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="mb-4">
          <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-400 max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  /*
    Empty state
  */
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <svg className="w-20 h-20 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-400 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Try adjusting your search terms or add some products to get started.
        </p>
      </div>
    );
  }

  /*
    Main grid UI
  */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;