import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateProduct } from "../api/product.api";

const UpdateProduct = ({ product, onUpdated, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    stock: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        brand: product.brand || "",
        stock: product.stock || "",
        description: product.description || "",
      });
      setImageFile(null);
      setError("");
    }
  }, [product]);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await updateProduct(product.id, formData);
      toast.success("Product updated successfully.");
      onUpdated();
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Please try again.");
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 shadow-2xl">
      <h2 className="text-3xl font-semibold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹) *</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Stock Quantity *</label>
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">New Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-4 bg-slate-800 rounded-xl border border-slate-600 text-white file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">Leave empty to keep the current image.</p>
          </div>
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-5 py-4 rounded-xl text-white font-medium transition-all duration-200"
          >
            {loading ? "Saving changes..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 px-5 py-4 rounded-xl text-white font-medium transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
