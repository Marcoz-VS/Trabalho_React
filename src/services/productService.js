import api from "./api";

export async function getAllProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function getProduct(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}
