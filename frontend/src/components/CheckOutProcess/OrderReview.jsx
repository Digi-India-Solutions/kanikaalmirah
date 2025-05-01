"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "./CheckoutForms.css";
import { axiosInstance } from "@/services/auth";
import { toast } from "react-toastify";
import logo from "../../../src/Assets/WebLogo.png";
import { useSelector } from "react-redux";
export default function OrderReview({
  formData,
  setFormData,
  orderItems,
  nextStep,
  prevStep,
}) {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const { user } = useSelector((state) => state.auth);
  const makePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderResponse = await axiosInstance.post(
      "/api/v1/checkout/create-checkout"
    );

    const data = await orderResponse.json();

    if (!data || !data.id) {
      alert("Failed to create Razorpay order");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.zipCode,
      landMark: formData.landmark,
      paymentMethod: formData.paymentMethod,
      savePaymentInfo: formData.savePaymentInfo,
    };

    if(formData.paymentMethod==="COD") {
      const response = await axiosInstance.post(
        "/api/v1/checkout/create-checkout",
        payload
      );
      const data = response?.data;
      if(data){    
       return nextStep();
      }
    }
else{
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    toast.error("Failed to load Razorpay script. Please try again.");
    return;
  }
  try {

    const response = await axiosInstance.post(
      "/api/v1/checkout/create-checkout",
      payload
    );

    const data = response?.data;
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.totalAmount,
      currency: "INR",
      name: "Kanika Almirah",
      description: `Payment for your Kanika Almirah order`,
      image: logo, // optional
      order_id: data?.checkout?.paymentInfo?.orderId,
      handler: async function (response) {
        const verifyData = await axiosInstance.post(
          "/api/v1/checkout/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        if (verifyData.success) {
          nextStep();
        } else {
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: user?.fullName,
        email: user?.email,
        contact: user?.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log("error", error?.response?.data.message || error.message);
    toast.error(error?.response?.data.message || error.message);
  }
}
   
  };

  // Calculate order totals
  const subtotal = orderItems.reduce(
    (total, item) => total + item?.productId.finalPrice * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping;

  return (
    <div className="checkout-form-container">
      <motion.h2
        className="form-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Review Your Order
      </motion.h2>

      <form onSubmit={handleSubmit}>
        <div className="review-sections">
          <div className="review-section">
            <div className="review-header">
              <h3>Shipping Information</h3>
              <button type="button" className="edit-btn" onClick={prevStep}>
                <i className="bi bi-pencil"></i> Edit
              </button>
            </div>
            <div className="review-content">
              <p>
                <strong>
                  {formData.firstName} {formData.lastName}
                </strong>
              </p>
              <p>{formData.address}</p>
              <p>
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
              <p>{formData.country}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone}</p>
            </div>
          </div>

          <div className="review-section">
            <div className="review-header"></div>
            <div className="review-content">
              <div className="form-group">
                <label>
                  <strong>Select Payment Method</strong>
                </label>
                <div className="d-flex gap-3 mt-2">
                  <div>
                    <input
                      type="radio"
                      id="COD"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMethod: e.target.value,
                        })
                      }
                      required
                    />
                    <label htmlFor="COD" className="ms-1">
                      Cash on Delivery
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="Online"
                      name="paymentMethod"
                      value="Online"
                      checked={formData.paymentMethod === "Online"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMethod: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="Online" className="ms-1">
                      Online Payment
                    </label>
                  </div>
                </div>
              </div>

              {formData.paymentMethod === "upi" && (
                <div className="payment-review">
                  <i className="bi bi-phone payment-icon"></i>
                  <div>
                    <p>
                      <strong>UPI Payment</strong>
                    </p>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "COD" && (
                <div className="payment-review">
                  <i className="bi bi-cash payment-icon"></i>
                  <div>
                    <p>
                      <strong>Cash on Delivery</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="review-section">
            <div className="review-header">
              <h3>Order Items</h3>
            </div>
            <div className="review-content">
              <div className="order-items-review">
                {orderItems.map((item) => (
                  <div key={item._id} className="order-item-review">
                    <div className="item-image">
                      <Image
                        src={item.productId?.coverImage || "/placeholder.svg"}
                        alt={item?.productId.productName}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-variant">
                        {item?.productId?.colorName}
                      </p>
                      <div className="item-price-qty">
                        <span className="item-price">
                          ₹
                          {item?.productId?.price &&
                            item?.productId?.finalPrice?.toLocaleString()}
                        </span>
                        <span className="item-qty">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals-review">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `₹${shipping?.toLocaleString()}`}
                  </span>
                </div>
                {/* <div className="total-row">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div> */}
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <motion.button
            type="button"
            className="btn-secondary"
            onClick={prevStep}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Payment
          </motion.button>

          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Place Order
            <i className="bi bi-check2-circle"></i>
          </motion.button>
        </div>
      </form>
    </div>
  );
}
