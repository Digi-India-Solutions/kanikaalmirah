"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import phonebanner from "../../Assets/phonebanner1.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import "./hero.css";
import { useDispatch, useSelector } from "react-redux";
import { bannerImages } from "@/redux/slices/authSlice";
const Hero = ({
  image = phonebanner,
  title = "Premium Almirah Experience",
  subtitle = "Discover our latest collection of premium almirahs",
  ctaText = "Shop Now",
  ctaLink = "/products",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const { banners} = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bootstrap = require("bootstrap"); // Ensure Bootstrap is loaded
      const carouselElement = document.getElementById("carouselExampleFade");
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 2000, // 2 seconds auto-play interval
          pause: false, // Do not stop on hover
          ride: "carousel", // Auto-start carousel
        });
      }
    }
    setIsVisible(true);

    dispatch(bannerImages());
  }, [dispatch]);

  return (
    <>
      <section className="Desktop-hero">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade banner-top-style"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {banners?.map((banner, index) => (
              <div
                key={banner._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ position: "relative", width: "100%", height: "500px" }}
              >
                <Image
                  src={banner.bannerImage}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="mobile-hero-section">
        <div className="mobile-hero-container">
          <div className="mobile-hero-image-container">
            <Image
              src={image || "/placeholder.svg"}
              alt="Mobile Hero"
              width={800}
              height={700}
              className="mobile-hero-image"
              priority
            />
            <div className="mobile-hero-overlay">
              <div className="mobile-hero-gradient"></div>
            </div>
          </div>

          <div className="mobile-hero-content">
            <motion.div
              className="mobile-hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <i className="bi bi-lightning-charge"></i>
              <span>ALMIRAH COLLECTIONS</span>
            </motion.div>

            <motion.h1
              className="mobile-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mobile-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mobile-hero-features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="feature-item">
                <i className="bi bi-box"></i>
                <span>Spacious Storage</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-lock-fill"></i>
                <span>Secure Locking</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-house-door"></i>
                <span>Elegant Design</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-shield-check"></i>
                <span>Durable & Long-lasting</span>
              </div>
            </motion.div>

            <motion.div
              className="mobile-hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link href={ctaLink} className="mobile-cta-button">
                {ctaText}
                <i className="bi bi-arrow-right"></i>
              </Link>
            </motion.div>

            <motion.div
              className="mobile-hero-scroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="mobile-scroll-indicator">
                <i className="bi bi-chevron-down"></i>
              </div>
              <span>Scroll to explore</span>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
