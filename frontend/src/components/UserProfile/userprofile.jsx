"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./userprofile.css";
import userImage from "../../Assets/UserImage.png";
import Link from "next/link";
import { toast } from "react-toastify";
import { axiosInstance } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth, updateUser } from "@/redux/slices/authSlice";
import { generateInvoicePDF } from "../generatePdf/generatepdf";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landMark: "",
    profileImage: null,
  });
  const router = useRouter();
 

  const addresses = [
    {
      id: 1,
      name: formData?.fullName || "",
      address: formData?.address || "",
      city: formData?.city || "",
      state: formData?.state || "",
      pincode: formData?.pincode || "",
      landMark: formData?.landMark || "",
      phone: formData?.phone || "",
      default: true,
    },
   
  ];

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // user?.user?.email
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success";
      case "Placed":
        return "bg-warning";
      case "Shipped":
        return "bg-info";
      case "Cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const fileInputRef = useRef(null);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const payload = new FormData();
    payload.append("image", file);
    let loading = toast.loading("Uploading profile image...");
    try {
      const response = await axiosInstance.put(
        `/api/v1/auth/update-profile`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success(
          response?.data?.message || "Profile Image updated successfully"
        );
        setFormData((prevData) => ({
          ...prevData,
          profileImage: URL.createObjectURL(file),
        }));
        toast.dismiss(loading);
      }
    } catch (error) {
      toast.dismiss(loading);
      console.log("error", error);
      toast.error(error?.response?.data?.message || "Profile Image failed");
    }
  };
  const handleClick = async () => {
    fileInputRef.current.click();
  };

  const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/auth/get-single-user/${user?._id}`
      );
  
      if (response.status === 200) {
        setFormData({
          fullName: response.data.user.fullName,
          lastName: response.data.user.lastName,
          phone: response.data.user.phone,
          address: response.data.user.address,
          city: response.data.user.city,
          state: response.data.user.state,
          pincode: response.data.user.pincode,
          landMark: response.data.user.landMark,
          profileImage: response.data.user.profileImage,
        });
      }
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response.data.message || "Logout failed");
    }
  };

  const handleSetingsToggle = () => {
    if (editMode) {
      const payload = {
        fullName: formData.fullName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landMark: formData.landMark,
      };
      dispatch(updateUser(payload));
      toast.success("Profile updated successfully");
    }
    setEditMode(!editMode);
  };
  const getOrders=async()=>{
    try {
   const response=   await axiosInstance.get(
        "/api/v1/checkout/get-order"
      )
      setOrders(response?.data?.order);

    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "Getting orders failed");
    }
  }
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/logout");
      if (response.status === 200) {
        toast.success("Logout successfully");
        router.push("/login");

        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response.data.message || "Logout failed");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);
  
  useEffect(() => {
    if (!loading && (!user)) {
      // router.push("/");
  
    }
  }, [user, loading, router]);
  useEffect(() => {
    if (!loading && user?.email) {
    
      getUserDetails();
      getOrders();
    }
  }, [user, loading]);
  


  if (loading || !user || !user.email) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }
  
  return (
    <>
      <div className="container py-3">
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-3">
            <div className="profile-sidebar">
              <div className="user-info text-center">
                <div className="profile-image-wrapper">
                  <img
                    src={formData?.profileImage || userImage}
                    ref={fileInputRef}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="profile-image"
                  />

                  <div>
                    <button className="edit-photo-btn" onClick={handleClick}>
                      <i className="bi bi-camera-fill"></i>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                  </div>
                </div>
                <h4 className="user-name mt-3">{user?.fullName}</h4>
                <p className="user-email">{user?.email}</p>
                <p className="member-since">
                  Member Since:{" "}
                  {user?.createdAt &&
                    new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="profile-nav">
                <button
                  className={`userprofile-nav-item ${
                    activeTab === "orders" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="bi bi-box-seam-fill"></i>
                  My Orders
                </button>
                {/* <button
                  className={`userprofile-nav-item ${
                    activeTab === "wishlist" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <i className="bi bi-cart4"></i>
                  Cart
                </button> */}
                <button
                  className={`userprofile-nav-item ${
                    activeTab === "addresses" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("addresses")}
                >
                  <i className="bi bi-geo-alt-fill"></i>
                  Addresses
                </button>
                <button
                  className={`userprofile-nav-item ${
                    activeTab === "settings" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <i className="bi bi-gear-fill"></i>
                  Settings
                </button>
                <button
                  className={"userprofile-nav-item"}
                  onClick={handleLogout}
                  style={{
                    backgroundColor: isHovered ? "#eb4343" : "transparent",
                    color: isHovered ? "white" : "black",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <i className="bi bi-box-arrow-left"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="content-wrapper">
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="orders-section">
                  <div className="section-header">
                    <h2>My Orders</h2>
                    <div className="section-header">
 
  <p className="text-muted">Track your recent and past orders</p>
</div>

                  </div>

                  <div className="orders-grid">
                    {orders.length > 0 ? orders?.map((order) => (
                      <div key={order?._id} className="order-card">
                        <div className="order-header">
                          <div>
                            <h6 className="order-id"></h6>
                            <span className="order-date">
                              <i className="bi bi-calendar3"></i>
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <span
                            className={`status-badge ${getStatusBadgeClass(
                             order?.orderStatus
                            )}`}
                          >
                            {order?.orderStatus}
                          </span>
                        </div>
                        <div className="order-info">
                          <div className="info-item">
                            <span className="label">Items</span>
                            <span className="value">{order?.items?.length}</span>
                          </div>
                          <div className="info-item">
                            <span className="label">Total</span>
                            <span className="value">
                              ₹{order?.totalAmount}
                            </span>
                          </div>
                        </div>
                        <div className="order-actions">
                          <button className="btn btn-outline-primary btn-sm"       onClick={() => generateInvoicePDF(order)}
                          >
                            <i className="bi bi-eye-fill"></i>
                            Invoice
                          </button>
                          <Link href={`/products/${order?.items[0]?.productId?._id}`}>
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="bi bi-arrow-repeat"></i>
                              Buy Again
                            </button>
                          </Link>
                        </div>
                      </div>
                    )) : (
                      <div className="order-card">
                        <div className="order-header">
                          <div>
                            <h6 className="order-id"></h6>
                            <span className="order-date">
                              <i className="bi bi-calendar3"></i>
                              No Orders Found
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="addresses-section">
                  <div className="section-header">
                    <h2>My Addresses</h2>
                    {/* <button className="btn btn-primary">
                      <i className="bi bi-plus-lg"></i>
                      Add New Address
                    </button> */}
                  </div>

                  <div className="addresses-grid">
                    {addresses.map((address) => (
                      <div key={address.id} className="address-card">
                        <div className="address-type">
                          <span className="type-badge">
                            <i className="bi bi-house-door-fill"></i>
                            {address.type}
                          </span>
                          {address.default && (
                            <span className="default-badge">
                              <i className="bi bi-check-circle-fill"></i>
                              Default
                            </span>
                          )}
                        </div>
                        <div className="address-details">
                          <h6>{address.name}</h6>
                          <p>{address.address}</p>
                          <p>{`${address.city}, ${address.state} ${address.pincode}`}</p>
                          <p>{address.phone}</p>
                          <p>{address.landMark}</p>
                        </div>
                        <div className="address-actions">
                          <button className="btn text-primary "
                  onClick={() => setActiveTab("settings")}
                          
                          >
                            <i className="bi bi-pencil-fill"></i>
                            Edit
                          </button>
                          {/* <button className="btn text-danger">
                            <i className="bi bi-trash-fill"></i>
                            Delete
                          </button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="settings-section">
                  <div className="section-header">
                    <h2>Account Settings</h2>
                    <button
                      className="btn btn-primary"
                      onClick={handleSetingsToggle}
                    >
                      <i
                        className={`bi bi-${
                          editMode ? "check-lg" : "pencil-fill"
                        }`}
                      ></i>
                      {editMode ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  <div className="settings-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>LandMark</label>
                          <input
                            type="text"
                            className="form-control"
                            name="landMark"
                            value={formData.landMark}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Pincode</label>
                          <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                    </div>
                    {/* 
      <div className="preferences-section">
        <h5>Preferences</h5>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailNotifications"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="emailNotifications">
            Email Notifications
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="smsNotifications"
          />
          <label className="form-check-label" htmlFor="smsNotifications">
            SMS Notifications
          </label>
        </div>
      </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
