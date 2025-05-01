"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import "./OrderConfirmation.css"

export default function OrderConfirmation({ orderItems }) {

  // /////////////////aman//////////////////////////
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  // Calculate order total
  const subtotal = orderItems.reduce((total, item) => total + item.productId.finalPrice * item.quantity, 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal 

  // Estimated delivery date (7 days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const formattedDeliveryDate = deliveryDate?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="confirmation-container">
      <motion.div
        className="confirmation-header"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-icon">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
      </motion.div>

      <motion.div
        className="order-details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="order-info-grid">
          <div className="order-info-item">
            <span className="info-label">Order Number</span>
            <span className="info-value">{orderNumber}</span>
          </div>

          <div className="order-info-item">
            <span className="info-label">Order Date</span>
            <span className="info-value">{new Date()?.toLocaleDateString()}</span>
          </div>

          <div className="order-info-item">
            <span className="info-label">Payment Method</span>
            <span className="info-value">Credit Card</span>
          </div>

          <div className="order-info-item">
            <span className="info-label">Estimated Delivery</span>
            <span className="info-value">{formattedDeliveryDate}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="order-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3>Order Summary</h3>

        <div className="confirmation-items">
          {orderItems.map((item) => (
            <div key={item.productId._id} className="confirmation-item">
              <div className="item-image">
                <Image src={item.productId?.coverImage || "/placeholder.svg"} alt={item?.productId.productName} width={60} height={60} />
              </div>
              <div className="item-details">
                <h4>{item.productId?.productName}</h4>
                {/* <p className="item-variant">{item.variant}</p> */}
                <div className="item-price-qty">
                  <span className="item-price">₹{item.productId.finalPrice?.toLocaleString()}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="confirmation-totals">
          <div className="total-row">
            <span>Subtotal</span>
            <span>₹{subtotal?.toLocaleString()}</span>
          </div>
          <div className="total-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          {/* <div className="total-row">
            <span>Tax (18% GST)</span>
            <span>₹{tax?.toLocaleString()}</span>
          </div> */}
          <div className="total-row grand-total">
            <span>Total</span>
            <span>₹{total?.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="shipping-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3>Shipping Information</h3>
        <p>Your order will be shipped to:</p>
        <div className="address-box">
          <p>
            <strong>John Doe</strong>
          </p>
          <p>123 Main Street</p>
          <p>New Delhi, Delhi 110001</p>
          <p>India</p>
        </div>
      </motion.div>

      <motion.div
        className="tracking-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="tracking-icon">
          <i className="bi bi-truck"></i>
        </div>
        <div className="tracking-content">
          <h3>Track Your Order</h3>
          <p>You will receive a shipping confirmation email with tracking information once your order ships.</p>
        </div>
      </motion.div>

      <motion.div
        className="confirmation-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Link href="/products" className="btn-secondary">
          <i className="bi bi-arrow-left"></i>
          Continue Shopping
        </Link>

        <Link href="/userProfile" className="btn-primary">
          View Order Status
          <i className="bi bi-box-seam"></i>
        </Link>
      </motion.div>
    </div>
  )
}

