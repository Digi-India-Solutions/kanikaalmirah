"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "./hero2.css";
import Banner3 from "../../Assets/Banner2.png";
import Banner4 from "../../Assets/Banner4.png";
import Banner5 from "../../Assets/Banner5.png";
import Heading from "../Heading/heading";

const Hero2 = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <Heading heading="PREMIUM PRODUCTS AT DISCOUNT" />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="products-grid">
            <motion.div
              className="main-product"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero-product-card">
                <Image
                  src={Banner3}
                  alt="Premium Bedroom Set"
                  width={1200}
                  height={600}
                  className="hero2-product-image"
                />
                <Link href="/products" className="shop-now-btn">
                  SHOP NOW
                </Link>
              </div>
            </motion.div>

            <div className="secondary-products">
              <motion.div
                className="hero-product-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src={Banner4}
                  alt="Premium Sofa"
                  width={600}
                  height={400}
                  className="hero2-product-image"
                />
                <Link href="/products" className="shop-now-btn">
                  SHOP NOW
                </Link>
              </motion.div>

              <motion.div
                className="hero-product-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src={Banner5}
                  alt="Premium Dining Set"
                  width={600}
                  height={400}
                  className="hero2-product-image"
                />
                <Link href="/products" className="shop-now-btn">
                  SHOP NOW
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero2;
