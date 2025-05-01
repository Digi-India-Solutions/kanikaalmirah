"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./OrderSummary.css"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCoupons } from "@/services/auth"
import { allCoupons } from "@/redux/slices/authSlice"

export default function OrderSummary({ orderItems }) {
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [isPromoOpen, setIsPromoOpen] = useState(false)
  const [hasAttemptedPromo, setHasAttemptedPromo] = useState(false);
  const [discount,setDiscount]=useState(0)
  // Calculate order totals
  const subtotal = orderItems.reduce((total, item) => total + item.productId.finalPrice * item.quantity, 0)
  // const discount = isPromoApplied ? subtotal * 0.1 : 0 
  const shipping = 0 // Free shipping
  const tax = (subtotal - discount) * 0.18 // 18% GST
  const total = subtotal - ( discount >100 ? discount:subtotal* discount/100) + shipping 
const dispatch=useDispatch()
const {coupons}=useSelector((state)=>state.auth)
  const handlePromoSubmit = (e) => {
    e.preventDefault()
    setHasAttemptedPromo(true);
    const matchedCoupon = coupons.find(
      coupon => coupon.couponCode=== promoCode.trim()
    );
    if(matchedCoupon){
      setIsPromoApplied(true)
      setDiscount(matchedCoupon.discount)
     
    }else{
      setIsPromoApplied(false)

    }
  }


  useEffect(() => {
    dispatch(allCoupons())
  },[])
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="summary-items">
        {orderItems.map((item) => (
          <div key={item._id} className="summary-item">
            <div className="item-name">
              <span>{item?.productId?.productName}</span>
              <span className="item-quantity">x{item?.quantity}</span>
            </div>
            <div className="item-price">₹{item?.productId?.finalPrice?.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="promo-section">
        <button type="button" className="promo-toggle" onClick={() => setIsPromoOpen(!isPromoOpen)}>
          <i className={`bi ${isPromoOpen ? "bi-dash" : "bi-plus"}`}></i>
          Apply Coupon Code
        </button>

        <AnimatePresence>
          {isPromoOpen && (
            <motion.div
              className="promo-form-container"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handlePromoSubmit} className="promo-form">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit" className="apply-btn" >
                  Apply
                </button>
              </form>

              {hasAttemptedPromo && (
  isPromoApplied ? (
    <div className="promo-success">
      <i className="bi bi-check-circle"></i>
      Promo code applied successfully!
    </div>
  ) : (
    <div className="promo-failure d-flex align-items-center gap-2 mt-2 text-danger">
    <i className="bi bi-x-circle-fill fs-5"></i>
    <span>Invalid promo code. Please try again.</span>
  </div>
  )
)}

              {/* <div className="available-promos">
                <div className="promo-code">
                  <i className="bi bi-tag"></i>
                  <div className="promo-details">
                    <span className="promo-name">WELCOME10</span>
                    <span className="promo-desc">10% off on your first order</span>
                  </div>
                </div>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="summary-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>₹{subtotal?.toLocaleString()}</span>
        </div>

        {isPromoApplied && (
          <div className="total-row discount">
            <span>Discount</span>
            <span>-{discount> 100 && "₹" }{discount?.toLocaleString()}{discount< 100 && "%" }</span>
          </div>
        )}

        <div className="total-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping?.toLocaleString()}`}</span>
        </div>

        {/* <div className="total-row">
          <span>Tax (18% GST)</span>
          <span>₹{tax?.toLocaleString()}</span>
        </div> */}
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>₹{total?.toLocaleString()}</span>
      </div>

      <div className="summary-footer">
        <div className="secure-checkout">
          <i className="bi bi-shield-lock"></i>
          <span>Secure Checkout</span>
        </div>

        <div className="payment-icons">
          <i className="bi bi-credit-card"></i>
          <i className="bi bi-paypal"></i>
          <i className="bi bi-wallet2"></i>
        </div>
      </div>
    </div>
  )
}

