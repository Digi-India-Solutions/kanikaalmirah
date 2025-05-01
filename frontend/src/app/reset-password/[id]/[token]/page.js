"use client";

import React, { useState } from "react";
import Head from "next/head";
import "../../../login/login.css";
import PageHeading from "@/components/PageHeading/pageHeading";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { axiosInstance } from "@/services/auth";
import { useRouter } from "next/navigation";

const ForgetPasswordPage = () => {
  const [formState, setFormState] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const { id, token } = useParams();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation check
    if (formState.newPassword !== formState.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/api/v1/auth/reset-password/${id}/${token}`,
        { password: formState.newPassword }
      );
     
      if (response.status === 200) {
        toast.success("Password reset successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while resetting the password."
      );
    }
  };

  return (
    <>
      <Head>
        <title>Forget Password - Access Your Account | Steel Shiva</title>
        <meta
          name="description"
          content="Reset your Steel Shiva account password to continue shopping for premium steel almirahs, wardrobes, and furniture."
        />
        <meta
          name="keywords"
          content="forget password, reset password, steel shiva login, customer login, steel almirah account, secure login, ecommerce login page"
        />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Forget Password - Access Your Account | Steel Shiva"
        />
        <meta
          property="og:description"
          content="Reset your password to manage orders and access deals on steel furniture from Steel Shiva."
        />
        <meta property="og:image" content="/images/steelshiva-login.jpg" />
        <meta
          property="og:url"
          content="https://steelshiva.com/forget-password"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Forget Password - Access Your Account | Steel Shiva"
        />
        <meta
          name="twitter:description"
          content="Reset your password to access your Steel Shiva account and continue shopping."
        />
        <meta name="twitter:image" content="/images/steelshiva-login.jpg" />

        <link rel="canonical" href="https://steelshiva.com/forget-password" />
      </Head>

      <div className="container">
        <div className="row">
          <PageHeading PageTitle="Forget Password" />
          <div className="animated-background">
            <div className="gradient-blob blob-1"></div>
            <div className="gradient-blob blob-2"></div>
            <div className="gradient-blob blob-3"></div>
          </div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-form active">
            <h2 className="login-form-title">Reset Your Password</h2>
            <p className="login-form-subtitle">Create your new password</p>

            <form className="login-form-content mt-3" onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="login-form-group">
                <div className="login-input-icon">
                  <i className="bi bi-lock Loginicon"></i>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={formState.newPassword}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        newPassword: e.target.value,
                      })
                    }
                    className="login-form-input"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="login-form-group">
                <div className="login-input-icon">
                  <i className="bi bi-lock-fill Loginicon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formState.confirmPassword}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="login-form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash Loginicon"></i>
                    ) : (
                      <i className="bi bi-eye Loginicon"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="Buy-btn">
                <button type="submit" className="submit-btn">
                  Submit <i className="bi bi-arrow-right btn-icon"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
