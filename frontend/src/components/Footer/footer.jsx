"use client";
import React, { useEffect } from "react";
import "./footer.css";
import Image from "next/image";
import footerlogo from "../../Assets/WebLogo.png";
import Link from "next/link";
import { fetchHomeCategory } from "@/redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
const Footer = () => {
  const dispatch = useDispatch();
  const { homeCategory, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchHomeCategory());
  }, []);
  return (
    <>
      <footer className="footer-main py-4">
        <div className="container">
          <div className="row">
            {/* <!-- Brand and Info --> */}
            <div className="col-md-3">
              <Image
                src={footerlogo}
                alt="Kanika Almirah Logo"
                className="footer-logo"
              />
              <Link
                href="tel:9312217117"
                className="text-decoration-none text-white"
              >
                <p className="m-0">
                  <b>Phone: </b>9312217117
                </p>
              </Link>{" "}
              <Link
                href="mailto:info@steelshiva.com"
                className="text-decoration-none text-white"
              >
                <p>
                  <b>Email: </b>info@steelshiva.com
                </p>
              </Link>
              <p>
                One of the Leading Manufacturer of Almirahs with so many Designs
                and high-quality security features that fill all customers'
                demands.
              </p>
            </div>

            {/* <!-- About --> */}
            <div className="col-md-3 col-6">
              <h5 className="fw-bold">About</h5>
              <ul className="list-unstyled">
                <li>
                  <Link href="/" className="text-white text-decoration-none">
                    HOME
                  </Link>
                </li>

                <li>
                  <Link
                    href="/aboutUs"
                    className="text-white text-decoration-none"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white text-decoration-none"
                  >
                    DEALERSHIP
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="text-white text-decoration-none"
                  >
                    CART
                  </Link>
                </li>
              </ul>
            </div>

            {/* <!-- Collections --> */}
            <div className="col-md-3 col-6 ">
              <h5 className="fw-bold">Collections</h5>
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
                <ul className="list-unstyled">
                  {homeCategory &&
                    homeCategory.slice(0, 4).map((category) => (
                      <li key={category?._id}>
                        <Link
                          href={`/product-by-category/${category?._id}`}
                          className="text-white text-decoration-none"
                        >
                          {category?.categoryName}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            {/* <!-- Useful Links --> */}
            <div className="col-md-3">
              <h5 className="fw-bold">Useful Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    href="/userProfile"
                    className="text-white text-decoration-none"
                  >
                    MY ORDERS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-white text-decoration-none"
                  >
                    PRODUCTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacypolicy"
                    className="text-white text-decoration-none"
                  >
                    PRIVACY POLICY
                  </Link>
                </li>

                <li>
                  <Link
                    href="/termconditions"
                    className="text-white text-decoration-none"
                  >
                    TERM & CONDITIONS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          {/* <!-- Footer Bottom --> */}
          <div className="row mt-2">
            <div className="col text-center">
              <p className="Rights">
                &copy; {new Date().getFullYear()} KANIKA ALMIRAH. All Rights
                Reserved. <br />
                Design by{" "}
                <Link href="https://digiindiasolutions.com/" target="_blank">
                  DIGI INDIA SOLUTIONS
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
