"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero1Image from "../../Assets/phonebanner1.jpg";
import "./hero1.css";

export default function Hero1() {
  const heroRef = useRef(null);
  const productRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient-overlay"></div>
        <div className="hero-pattern-overlay"></div>
      </div>

      <div className="container hero1-sec">
        <div className="hero-content">
          <div className="hero-text">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <i className="bi bi-award-fill"></i>
              <span>Premium Quality Steel Almirahs</span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Transform Your Space with
              <span className="gradient-text"> Premium Storage Solutions</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Discover our collection of premium steel almirahs, designed to
              bring elegance and functionality to your home. Built to last with
              superior craftsmanship and modern features.
            </motion.p>

            <motion.div
              className="hero-cta"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <Link href="/products" className="cta-button primary">
                Explore Collection
                <i className="bi bi-arrow-right"></i>
              </Link>
              <Link href="/contact" className="cta-button secondary">
                Contact Us
              </Link>
            </motion.div>

            <motion.div
              className="hero-features"
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <div className="feature-item">
                <i className="bi bi-shield-lock-fill"></i>
                <span>10 Year Warranty</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-lightning-fill"></i>
                <span>Quick Installation</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-award-fill"></i>
                <span>Premium Quality</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-product"
            ref={productRef}
            style={{ y, opacity }}
          >
            <motion.div className="product-showcase">
              <Image
                src={Hero1Image}
                alt="Premium Steel Almirah"
                width={500}
                height={600}
                className="hero1-product-image"
                priority
              />

              <motion.div className="product-highlight">
                <div className="highlight-content">
                  <span className="highlight-label">Starting from</span>
                  <span className="highlight-price">₹999</span>
                </div>
              </motion.div>

              <motion.div className="feature-tag tag-1">
                <i className="bi bi-shield-lock-fill"></i>
                <span>Premium Steel</span>
              </motion.div>

              <motion.div className="feature-tag tag-2">
                <i className="bi bi-lightning-fill"></i>
                <span>Smart Lock</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
