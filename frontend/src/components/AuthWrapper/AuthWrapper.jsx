"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "@/redux/slices/authSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
