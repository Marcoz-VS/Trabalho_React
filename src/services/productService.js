import api from "./api";

export async function getAllProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function getByCategory(category) {
  const res = await api.get(`/products/category/${category}`);
  return res.data;
}
