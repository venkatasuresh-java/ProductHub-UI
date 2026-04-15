// ProductDetailsPage.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchProductById,
  updateProduct,
  removeProduct,
} from "../product.api";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  // Load product
  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id);
      setProduct(data);

      setForm({
        name: data.name || "",
        price: data.price || "",
        brand: data.brand || "",
        stock: data.stock || "",
        description: data.description || "",
      });
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "product",
        new Blob([JSON.stringify(form)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("ImageFile", image);
      }

      const updated = await updateProduct(id, formData);

      setProduct(updated);
      setIsEditing(false);

      toast.success("Product updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await removeProduct(id);
      toast.success("Product deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.618-2.479M12 7v14m0-14V5a2 2 0 012-2h4a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">Product not found</h3>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IMAGE */}
        <div className="w-full">
          <div className="sticky top-24">
            <div className="w-full h-96 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://localhost:8080/api/products/${product.id}/image`
                }
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-8">
          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                    <p className="text-xl text-gray-400 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {product.brand || "Unknown Brand"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm">
                      {product.stock > 0 ? (
                        <span className="text-green-400 flex items-center justify-end">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          In Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center justify-end">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Out of Stock
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description || "No description available for this product."}
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-6 py-4 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Product
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-4 bg-red-600 hover:bg-red-700 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Product
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Brand
                  </label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Update Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-2">Leave empty to keep current image. Supported formats: JPG, PNG, GIF, WebP</p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-4 bg-gray-600 hover:bg-gray-700 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;