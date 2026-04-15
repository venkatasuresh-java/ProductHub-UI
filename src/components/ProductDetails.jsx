import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchProductById } from "../api/product.api";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product details.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleRefresh = async () => {
    setIsEditing(false);
    await loadProduct();
  };

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

  if (!product) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <svg className="w-16 h-16 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m6 12H3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">Product not found</h3>
        <p className="text-gray-500">The product may have been removed or does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full">
          <div className="sticky top-24">
            <div className="w-full h-96 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
              <img
                src={`http://localhost:8080/api/products/${product.id}/image`}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-col xl:flex-row">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                    <p className="text-xl text-gray-400">{product.brand || "Unknown Brand"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm">
                      {Number(product.stock) > 0 ? (
                        <span className="text-green-400">In Stock ({product.stock})</span>
                      ) : (
                        <span className="text-red-400">Out of Stock</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">{product.description || "No description available for this product."}</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-6 py-4 rounded-xl text-white font-medium transition-all duration-200"
                >
                  Edit Product
                </button>
                <DeleteProduct productId={product.id} onDeleted={() => navigate("/")} />
              </div>
            </>
          ) : (
            <UpdateProduct product={product} onUpdated={handleRefresh} onCancel={() => setIsEditing(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
