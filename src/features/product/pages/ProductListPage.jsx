// ProductListPage.jsx

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchProducts, searchProducts } from "../product.api";
import ProductList from "../components/ProductList";

const ProductListPage = () => {
  const { search } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (search.trim() === "") {
          data = await fetchProducts();
        } else {
          data = await searchProducts(search);
        }

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.content)) {
          setProducts(data.content);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error loading products", err);
        setError("Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search]);

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Discover Amazing Products
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our curated collection of high-quality products. Find exactly what you're looking for with our powerful search.
        </p>
        {search && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full">
            <span className="text-indigo-400 text-sm">Searching for:</span>
            <span className="ml-2 text-white font-medium">"{search}"</span>
          </div>
        )}
      </div>

      {/* STATS BAR */}
      {!loading && !error && (
        <div className="flex justify-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4">
            <div className="flex items-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">{products.length}</div>
                <div className="text-gray-400">Products</div>
              </div>
              <div className="w-px h-8 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {products.filter(p => p.stock > 0).length}
                </div>
                <div className="text-gray-400">In Stock</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
};

export default ProductListPage;