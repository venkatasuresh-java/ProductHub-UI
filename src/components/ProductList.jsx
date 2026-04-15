import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { fetchProducts, searchProducts } from "../api/product.api";

const ProductList = () => {
  const { search } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = search.trim() ? await searchProducts(search.trim()) : await fetchProducts();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.content)
          ? data.content
          : [];
        setProducts(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please refresh or try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [search]);

  const productCount = products.length;
  const inStockCount = products.filter((product) => Number(product.stock) > 0).length;

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

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Discover Amazing Products
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our curated collection of high-quality products. Find exactly what you're looking for with our powerful search.
        </p>
        {search.trim() && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full">
            <span className="text-indigo-400 text-sm">Searching for:</span>
            <span className="ml-2 text-white font-medium">"{search.trim()}"</span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4">
          <div className="flex items-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-400">{productCount}</div>
              <div className="text-gray-400">Products</div>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{inStockCount}</div>
              <div className="text-gray-400">In Stock</div>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-20 h-20 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-400 mb-2">No products found</h3>
          <p className="text-gray-500 max-w-md mx-auto">Try a different search term or add new products to populate the catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group block rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl transition hover:-translate-y-1 hover:border-indigo-500"
            >
              <div className="h-64 mb-4 overflow-hidden rounded-3xl bg-slate-800 border border-slate-700">
                <img
                  src={`http://localhost:8080/api/products/${product.id}/image`}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h2 className="text-xl font-semibold text-white truncate">{product.name || "Unnamed product"}</h2>
                  <p className="text-sm text-gray-400 truncate">{product.brand || "Unknown brand"}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>₹{Number(product.price || 0).toLocaleString("en-IN")}</span>
                  <span className={Number(product.stock) > 0 ? "text-green-400" : "text-red-400"}>
                    {Number(product.stock) > 0 ? `In stock (${product.stock})` : "Out of stock"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3">{product.description || "No description available."}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
