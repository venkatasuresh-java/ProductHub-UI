// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
    
    {/* Toast container */}
    <Toaster position="top-right" />

  </React.StrictMode>
);