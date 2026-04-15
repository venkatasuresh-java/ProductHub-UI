import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

export const fetchProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const searchProducts = async (keyword) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { keyword },
  });
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await axios.post(BASE_URL, formData);
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, formData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
