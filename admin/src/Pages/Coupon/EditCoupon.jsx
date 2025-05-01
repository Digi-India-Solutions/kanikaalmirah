import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { getData, postData } from "../../services/FetchNodeServices";

const EditCoupen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Initialize the state with default values
    const [formData, setFormData] = useState({
        couponCode: "",
        discount: "",
        couponTitle:""
    });
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/coupon/get-coupon/${id}`);
                if (response.status===200) {
                    setFormData({
                        couponCode: response?.data.coupon?.couponCode,
                        discount: response?.data.coupon?.discount,
                        couponTitle: response?.data.coupon?.title
                    });
                }
            } catch (error) {
                toast.error("Error fetching coupon data");
                console.error("Error fetching coupon:", error);
            }
        };
        fetchCoupon();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        let body = {
            couponCode: formData?.couponCode,
            discount: formData?.discount,
            title: formData?.couponTitle
        }

        try {
            const response = await axiosInstance.put(`/api/v1/coupon/update-coupon/${id}`, body);
            if (response?.status === 200) {
                toast.success(response.data.message);
                navigate("/all-coupon");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating coupon");
            console.error("Error updating coupon:", error);
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Coupon</h4>
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
                            Discount
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

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`${btnLoading ? "not-allowed" : "allowed"}`}
                            disabled={btnLoading}
                        >
                            {btnLoading ? "Please Wait..." : "Update Coupon"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCoupen;
