import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { postData } from "../../services/FetchNodeServices";

const AddCoupon = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ couponCode: "", discount: "", couponTitle: "" });

    const navigate = useNavigate();

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData?.couponCode || !formData?.discount) {
            toast.error("Please fill all fields");
            setIsLoading(false);
            return; 
        }

        if(formData?.discount < 0 ){
            toast.error("Discount should be greater than 0");
            setIsLoading(false);
            return;
        }
        let body = {
            couponCode: formData?.couponCode,
            discount: formData?.discount,
            title: formData?.couponTitle
        };

        try {
            const response = await axiosInstance.post("/api/v1/coupon/create-coupon", body);
            if (response.status === 201) {
                toast.success(response?.data?.message || "Coupon created successfully");
                navigate("/all-coupon");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error adding coupon";
            toast.error(errorMessage);
            console.error("Error adding coupon:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Coupon</h4>
                </div>
                <div className="links">
                    <Link to="/all-coupons" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="couponCode" className="form-label">
                            Coupon Code
                        </label>
                        <input
                            type="text"
                            name="couponCode"
                            className="form-control"
                            id="couponCode"
                            value={formData.couponCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="discount" className="form-label">
                            Coupon Discount
                        </label>
                        <input
                            type="text"
                            name="discount"
                            className="form-control"
                            id="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="discount" className="form-label">
                            Coupon Title
                        </label>
                        <input
                            type="text"
                            name="couponTitle"
                            className="form-control"
                            id="couponTitle"
                            value={formData.couponTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-success" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Add Coupon"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCoupon;
