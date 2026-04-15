import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProduct } from "../api/product.api";

const DeleteProduct = ({ productId, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
      return;
    }

    setLoading(true);
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully.");
      onDeleted();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-5 py-4 rounded-xl text-white font-medium transition-all duration-200"
    >
      {loading ? "Deleting..." : "Delete Product"}
    </button>
  );
};

export default DeleteProduct;
