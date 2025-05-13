import axios from "axios";

const Base_URL = "https://api.kanikaalmirah.com";

export const axiosInstance = axios.create({
  baseURL: Base_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});


export const signUp = async (userData) => {
 
  const res = await axios.post(`${Base_URL}/api/v1/auth/sign-up`, userData);
  return res.data;
};

export const signIn = async (userData) => {
 
  const res = await axios.post(`${Base_URL}/api/v1/auth/sign-in`, userData,{withCredentials:true});
  return res.data;
};
export const forgotPassword = async (userData) => {

  const res = await axios.post(
    `${Base_URL}/api/v1/auth/forgot-password`,
    userData
  );
  return res.data;
};
export const checkAuthUser = async () => {
  const res = await axios.get(`${Base_URL}/api/v1/auth/verify-user`, {
    withCredentials: true,   });
 
  return res.data;
};

export const fetchBannerImages = async () => {
  const res = await axios.get(`${Base_URL}/api/v1/banner/get-all-banners`);
  return res.data.banners;
};
export const fetchCertificateImages = async () => {
  const res = await axios.get(
    `${Base_URL}/api/v1/certificate/get-all-certificates`
  );
  return res.data;
};

export const fetchAllCoupons = async () => {
  const res = await axios.get(`${Base_URL}/api/v1/coupon/get-all-coupons`);
  return res.data.coupons;
};
