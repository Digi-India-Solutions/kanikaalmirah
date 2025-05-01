import { axiosInstance } from "./auth";

export const getAllCategories = async () => {
    const res = await axiosInstance.get("/api/v1/category/get-all-categories");
    return res.data.categories;
};

export const fetchHomeCategories = async () => {
    const res = await axiosInstance.get("/api/v1/category/get-home-categories");
    return res.data.categories;
};

export const getCategoryDetails = async (id) => {
    const res = await axiosInstance.get(`/api/v1/category/get-single-category/${id}`);

    return res?.data?.category?.products;
  };
  