"use client";

import React from "react";
import { motion } from "framer-motion";
import "./Terms.css";
import PageHeading from "@/components/PageHeading/pageHeading";
import Head from "next/head";

const page = () => {
  return (
    <>
      <Head>
        <title>
          Terms & Conditions - Policies for Secure Shopping | Steel Shiva
        </title>
        <meta
          name="description"
          content="Read the terms and conditions of Steel Shiva for secure shopping, returns, payments, and legal policies. Know your rights and responsibilities when purchasing steel almirahs and storage furniture."
        />
        <meta
          name="keywords"
          content="terms and conditions, ecommerce policies, Steel Shiva terms, online shopping rules, return policy, payment policy, user agreement, refund policy, shipping terms, order cancellation, customer rights, secure shopping, privacy and policy, website terms, product warranty, service agreement, transaction policies, terms of use, safe transactions, metal furniture purchase guidelines, legal agreements, consumer protection, data security policies, company policies"
        />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Terms & Conditions - Policies for Secure Shopping | Steel Shiva"
        />
        <meta
          property="og:description"
          content="Read Steel Shiva's terms & conditions to understand our policies on payments, returns, and customer rights. Shop steel almirahs & storage furniture safely."
        />
        <meta property="og:image" content="/images/steelshiva-terms.jpg" />
        <meta
          property="og:url"
          content="https://steelshiva.com/terms-and-conditions"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Terms & Conditions - Policies for Secure Shopping | Steel Shiva"
        />
        <meta
          name="twitter:description"
          content="Know your rights! Read our terms and conditions for secure shopping, returns, and payments at Steel Shiva. Your trusted metal furniture store."
        />
        <meta name="twitter:image" content="/images/steelshiva-terms.jpg" />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://steelshiva.com/terms-and-conditions"
        />
      </Head>

      <div className="container">
        <div className="row">
          <PageHeading PageTitle="OUR TERM & CONDITIONS" />

          <motion.div
            className="terms-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome to Kanika Almirah. By accessing our website, you agree to
              abide by the following terms and conditions.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              1. Use of Website
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              This website is intended for customers looking to purchase
              high-quality steel almirahs. Unauthorized use or reproduction of
              content is prohibited.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              2. Orders & Payments
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <li>All orders must be prepaid via secure payment methods.</li>
              <li>Prices and availability are subject to change.</li>
              <li>
                We reserve the right to cancel any order at our discretion.
              </li>
            </motion.ul>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              3. Shipping & Delivery
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <li>Orders are processed within 2-5 business days.</li>
              <li>Shipping times may vary based on location.</li>
              <li>
                We are not responsible for delays due to courier services.
              </li>
            </motion.ul>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              4. Returns & Refunds
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <li>Returns are accepted within 7 days of delivery.</li>
              <li>Items must be in original condition with packaging.</li>
              <li>Refunds will be processed within 5-10 business days.</li>
            </motion.ul>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              5. Privacy Policy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              Your personal data is kept secure and never shared with third
              parties without your consent.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              6. Contact Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              If you have any questions about these terms, please reach out to
              us at <strong>support@kanikaalmirah.com</strong>.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default page;
