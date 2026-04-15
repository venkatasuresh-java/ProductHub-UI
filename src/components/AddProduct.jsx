import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct } from "../api/product.api";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    stock: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select an image file for the product.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        price: form.price === "" ? null : Number(form.price),
        stock: form.stock === "" ? null : Number(form.stock),
      };

      const formData = new FormData();
      formData.append(
        "product",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        })
      );
      formData.append("imageFile", imageFile);

      await createProduct(formData);
      toast.success("Product added successfully.");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product. Please try again.");
      setError("Unable to submit product. Please verify product details and retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="mb-6">
          <svg className="w-16 h-16 text-indigo-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Add New Product
        </h1>
        <p className="text-gray-400 text-lg">Fill in the details to add a product to your catalog.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full">
          <div className="w-full h-96 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center px-6">
                <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-lg">Product image preview</p>
                <p className="text-gray-500 text-sm mt-2">Upload an image to see a preview.</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹) *</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Stock Quantity *</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
                className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter product description"
                className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, GIF, WebP</p>
            </div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-5 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
          >
            {loading ? (
              <>
                <span className="inline-block h-5 w-5 mr-3 border-4 border-white border-t-transparent rounded-full animate-spin" />
                Adding Product...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
