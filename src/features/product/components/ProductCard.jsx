// ProductCard.jsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer border border-slate-700/50 hover:border-indigo-500/30"
      onClick={() => navigate(`/product/${product.id}`)}
    >

      {/* IMAGE */}
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
        <motion.img
          src={`http://localhost:8080/api/products/${product.id}/image`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* STOCK BADGE */}
        <div className="absolute top-3 right-3">
          {product.stock > 0 ? (
            <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>


      {/* CONTENT */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {product.name}
        </h2>

        <p className="text-gray-400 text-sm mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {product.brand || "Unknown Brand"}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-indigo-600/20 rounded-full group-hover:bg-indigo-600/40 transition-colors"
          >
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;