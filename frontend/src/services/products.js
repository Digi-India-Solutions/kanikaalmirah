import axios from "axios";

const BASE_URL = "https://api.kanikaalmirah.com";

export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/api/v1/product/get-all-products`);
  return res.data.products;
};

export const getProductDetails = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/api/v1/product/get-single-product/${id}`
  );
  return res.data.product;
};

export const getProductByCategory = async (categoryId) => {
  const res = await axios.get(
    `${BASE_URL}/api/v1/category/get-single-category/${categoryId}`
  );

  return {
    products: res?.data?.category?.products,
    categoryName: res?.data?.category?.categoryName,
  };
};
