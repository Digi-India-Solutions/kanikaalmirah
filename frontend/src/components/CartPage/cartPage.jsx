"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NoProductsFound from "../../Assets/NoProduct.png";

import "./cart.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  decreaseQuantityVal,
  fetchCartItems,
  increaseQuantity,
  removeFromCart,
  safeJSONParse,
  setCartFromLocalStorage,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import { updateQuanityToServer } from "@/services/cart";
import { axiosInstance } from "@/services/auth";

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [shippingMethod, setShippingMethod] = useState("standard");
  const { user, loading } = useSelector((state) => state.auth);

  const subtotal = items &&  items.reduce((sum, item) => {
    const price = item.productId?.price ?? item.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = shippingMethod === "express" ? 19.99 : 0;
  const discount = 0; // Calculate based on promo code
  const total = subtotal  - discount;

  const handleDecrease = async (productId) => {
    if (user && user?.email) {
      try {
        await dispatch(updateQuantity({ productId, action: "decrease" }));
        dispatch(fetchCartItems()); 
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(decreaseQuantity({ productId })); 
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    if (user && user?.email) {
      try {
       
        await dispatch(updateQuantity({ productId, action: "increase" }));
        dispatch(fetchCartItems()); 
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(increaseQuantity({ productId }));
    }
  };
  const handleRemoveFromCart = async (productId) => {
    if (user && user?.email) {
      try {
        const response=  await axiosInstance.post("/api/v1/cart/remove-from-cart", { productId: productId?._id });
     
        dispatch(removeFromCart({ productId: productId?._id }));
    
      } catch (error) {
        console.log("error", error?.response?.data.message || error.message);
      }
    } else {
      dispatch(removeFromCart({ productId: productId }));
    }

    dispatch(decreaseQuantity({ productId: productId }));

  };
  useEffect(() => {
    if (loading) return;

    if (user && user?.email) {
      dispatch(fetchCartItems());
    } else {
      if (typeof window !== "undefined") {
        const cartData = localStorage.getItem("cart");
        const parsedCart = safeJSONParse(cartData);
        if (parsedCart && Array.isArray(parsedCart)) {
          dispatch(setCartFromLocalStorage(parsedCart));
        }
      }
    }

  }, [loading]);

  return (
    <>
      <div className="container pb-5">
        <div className="row">
          {/* Main Cart Content */}
          <div className="col-lg-8">
            {/* <div className="cart-header mb-4">
                <h1 className="cart-title">Shopping Cart</h1>
                <div className="cart-breadcrumb">
                  Cart <ChevronRight className="breadcrumb-icon" /> Shipping{" "}
                  <ChevronRight className="breadcrumb-icon" /> Payment
                </div>
              </div> */}

            {/* Cart Items */}
            <div className="cart-items">
              {items && items?.length > 0 ? (
                items.map((item,i) => (
                  <div key={i} className="cart-item">
                    <div className="item-image">
                  <Link href={`/products/${item?.productId?._id}`}>    <Image
                        src={
                          item?.image ||
                          item?.productId?.coverImage ||
                          "/placeholder.svg"
                        }
                        alt={item?.name || item?.productId.productName || "Product"}
                        width={120}
                        height={120}
                        className="product-image"
                      /> </Link>
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">
                        {item?.name || item?.productId?.productName}
                      </h3>
                      <div className="item-meta">
                        <span>
                          Color: {item.color || item?.productId?.colorName}
                        </span>
                        <span>Size: {item.size || item?.productId?.size}</span>
                      </div>
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            disabled={item.quantity === 1}
                            onClick={() => handleDecrease(item.productId._id)}
                          >
                            <i className="bi bi-dash-lg icon-sm1"></i>
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            disabled={item.quantity === item.stock}
                            onClick={()=>handleIncreaseQuantity(item?.productId._id)}
                          >
                            <i className="bi bi-plus-lg icon-sm1"></i>
                          </button>
                        </div>
                        <div className="item-price">
                          ₹
                          {item.productId?.price
  ? Math.round(item.productId.finalPrice * item.quantity)
  : Math.round(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                    <div className="item-actions-secondary">
                      <button
                        className="action-btn"
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        <i className="bi bi-trash icon-sm1"></i>
                      </button>
                      {/* <button className="action-btn">
                        <i className="bi bi-heart icon-sm1"></i>
                      </button> */}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Image
                    src={NoProductsFound}
                    alt="No Products Found"
                    className="img-fluid"
                    style={{ width: "200px", marginBottom: "20px" }}
                  />
                  <h3>Oops! No Products Found</h3>

                  <p>
                    No products in your cart. Please add items to your cart to proceed with the checkout.
                  </p>
                  <Link href="/products">
                    <button
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Explore Products
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Shopping Security */}
            <div className="shopping-security">
              <div className="security-item">
                <i className="bi bi-shield-check security-icon"></i>
                <div>
                  <h4>Secure Shopping</h4>
                  <p>Your data is protected</p>
                </div>
              </div>
              <div className="security-item">
                <i className="bi bi-alarm security-icon"></i>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Round the clock assistance</p>
                </div>
              </div>
              <div className="security-item">
                <i className="bi bi-truck security-icon"></i>
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Ships within 1 week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              {/* Promo Code */}
              {/* <div className="promo-code">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button className="promo-btn">Apply</button>
              </div> */}

              {/* Shipping Method */}
              {/* <div className="shipping-method">
                <h3>Shipping Method</h3>
                <div className="shipping-options">
                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <div>
                        <h4>Standard Delivery</h4>
                        <p>2-3 business days</p>
                      </div>
                      <span className="shipping-price">Free</span>
                    </div>
                  </label>
                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <div>
                        <h4>Express Delivery</h4>
                        <p>1-2 business days</p>
                      </div>
                      <span className="shipping-price">₹19.99</span>
                    </div>
                  </label>
                </div>
              </div> */}

              {/* Summary Calculations */}
              <div className="summary-calculations">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal?.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="text-decoration-none">
                <div className="Buy-btn">
                  <button className="w-100 py-3">
                    <p>
                      {" "}
                      Proceed to Checkout{" "}
                      <i className="bi bi-arrow-right icon-sm1 animated-class"></i>
                    </p>
                  </button>
                </div>
              </Link>
              <Link href="/products" className="text-decoration-none">
                <div>
                  <button className="checkout-btn">
                    <p>
                      {" "}
                      Continue Shopping{" "}
                      <i className="bi bi-cart4 icon-sm1 animated-class"></i>
                    </p>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
