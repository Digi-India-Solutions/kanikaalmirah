import { axiosInstance } from "./auth";

export const createContactEnquiry = async (payload) => {
  const res = await axiosInstance.post("/api/v1/inquiry/create-inquiry", payload);
  return res.data;
};
