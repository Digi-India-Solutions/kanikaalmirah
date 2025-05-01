"use client";
import Link from "next/link";
import "./navbar.css";
import weblogo from "../../Assets/WebLogo.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { allCoupons } from "@/redux/slices/authSlice";

import { fetchHomeCategory } from "@/redux/slices/categorySlice";

import { fetchCartItems, safeJSONParse, setCartFromLocalStorage } from "@/redux/slices/cartSlice";


const Navbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading:userLoading,coupons } = useSelector((state) => state.auth);
  const { homeCategory, loading, error } = useSelector(
    (state) => state.category
  );


  useEffect(() => {
    dispatch(allCoupons());
    dispatch(fetchHomeCategory());
  }, []);

 const { items } = useSelector((state) => state.cart);

   useEffect(() => {
      if (userLoading) return;
     
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
 
    }, [dispatch,user,userLoading]);
    
  const messages =
    Array.isArray(coupons) &&
    coupons
      ?.filter((coupon) => coupon.isActive === true)

      .map((coupon) => coupon.title || `🔥 Use Code: ${coupon.couponCode}`);

  useEffect(() => {
    if (messages && messages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 3000); // every 3 seconds
      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <>
      <div className="to-make-fix">
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="nav-info">
                <div className="left-nav">
                  <i className="bi bi-telephone"></i>
                  <Link href="tel: 9312217117">
                    <p className="m-0">9312217117</p>
                  </Link>
                </div>
                <div className="center-nav">
                  <div className="info-text">
                    <p className="m-0">
                      {messages?.length > 0
                        ? messages[currentIndex]
                        : "🎉 Welcome to our Kanika Almirah!"}
                    </p>
                  </div>
                </div>
                <div className="right-nav">
                  <i className="bi bi-question-circle"></i>
                  <Link href="/contact">
                    <p className="m-0">Help</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="nav-info1">
                <div className="left-nav1">
                  <Link href="/contact">
                    <div className="inner-left-nav1">
                      <i className="bi bi-lightning-charge"></i>
                      <p>Dealership</p>
                    </div>
                  </Link>
                </div>

                <div className="center-nav1 py-2">
                  <Link href="/">
                    <Image src={weblogo} alt="KANIKA ALMIRAH" />
                  </Link>
                </div>
                <div className="mob-humber">
                  <button
                    className="menu-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <i className="bi bi-list"></i>
                  </button>
                </div>
                <div className="right-nav1">
                  <Link href="/cart">
                    <div className="inner-left-nav1">
                      <i className="bi bi-cart4"></i>

                      <p>
                        Cart <sup>({items?.length})</sup>
                      </p>
                    </div>
                  </Link>
                  {/* <Link href="/">
                    <div className="inner-left-nav1">
                      <i className="bi bi-bag-heart"></i> <p>Wishlist</p>
                    </div>
                  </Link> */}
                  {user && user?.email ? (
                    <Link href="/userProfile">
                      <div className="inner-left-nav1">
                        <i className="bi bi-person-circle"></i>{" "}
                        <p>My Profile</p>
                      </div>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <div className="inner-left-nav1">
                        <i className="bi bi-person"></i> <p>Log In</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="m-0" />

        <section className="Category-nav bg-light">
          <nav className="navbar2">
            <div className="container p-0">
              {loading ? (
                <div className="d-flex justify-content-center py-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center text-danger py-3">
                  Error loading categories: {error}
                </div>
              ) : (
                <ul className="nav-links">
                  {homeCategory &&
                    homeCategory.slice(0, 6).map((category) => (
                      <li
                        key={category?._id}
                        className={`nav-item ${
                          pathname === `/product-by-category/${category?._id}`
                            ? "active"
                            : ""
                        }`}
                      >
                        <Link
                          href={`/product-by-category/${category?._id}`}
                          className="nav-link2"
                        >
                          {category?.categoryName}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </nav>
        </section>

        <hr className="m-0" />
      </div>

      <section className="mob-web-links">
        <div className={`web-mobile-nav ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>

          {loading ? (
            <div className="d-flex justify-content-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-danger py-3">
              Error loading categories: {error}
            </div>
          ) : (
            <ul className="web-nav-links-mobile">
              {homeCategory &&
                homeCategory.slice(0, 6).map((category) => (
                  <li key={category?._id}>
                    <Link
                      href={`/product-by-category/${category?._id}`}
                      className="web-nav-link2"
                      onClick={() => setIsOpen(false)}
                    >
                      {category?.categoryName}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </section>

      <hr className="m-0" />

      <section className="mobile-nav">
        <div className="bottom-bar">
          <Link href="/" className="mobnav-item active">
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </Link>
          <Link
            href="https://wa.me/93122171176"
            target="_blank"
            className="mobnav-item"
          >
            <i className="bi bi-whatsapp"></i>
            <span>Chat</span>
          </Link>
          <Link href="/cart" className="mobnav-item">
            <i className="bi bi-cart-fill"></i>
            <span>Cart</span>
          </Link>
          {user ? (
            <Link href="/userProfile" className="mobnav-item">
              <i className="bi bi-person-circle"></i>
              <span>Profile</span>
            </Link>
          ) : (
            <Link href="/login" className="mobnav-item">
              <i className="bi bi-person-fill"></i>
              <span>Login</span>
            </Link>
          )}

          <Link href="/contact" className="mobnav-item">
            <i className="bi bi-hand-index-thumb-fill"></i>
            <span>Dealership</span>
          </Link>
        </div>
      </section>

      <section></section>
    </>
  );
};

export default Navbar;
