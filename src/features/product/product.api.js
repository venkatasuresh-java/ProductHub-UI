// product.api.js

import axios from "axios";

/*
  Base URL for backend
*/
const BASE_URL = "http://localhost:8080/api/products";

/*
  GET ALL PRODUCTS
*/
export const fetchProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

/*
  GET PRODUCT BY ID
*/
export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

/*
  ADD PRODUCT (multipart)
*/
export const createProduct = async (formData) => {
  const res = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/*
  UPDATE PRODUCT
*/
export const updateProduct = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/*
  DELETE PRODUCT
*/
export const removeProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

/*
  SEARCH PRODUCTS
*/
export const searchProducts = async (keyword) => {
  const res = await axios.get(`${BASE_URL}/search?keyword=${keyword}`);
  return res.data;
};