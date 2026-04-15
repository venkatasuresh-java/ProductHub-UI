// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;