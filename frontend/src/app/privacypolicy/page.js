"use client";

import React from "react";
import { motion } from "framer-motion";
import PageHeading from "@/components/PageHeading/pageHeading";
import "./PrivacyPolicy.css";
import Head from "next/head";

const page = () => {
  return (
    <>

<Head>
        <title>Privacy Policy - Your Data Protection & Security | Steel Shiva</title>
        <meta name="description" content="Read the privacy policy of Steel Shiva to understand how we collect, use, and protect your personal information while shopping for steel almirahs, wardrobes, and metal furniture." />
        <meta name="keywords" content="privacy policy, data protection, user privacy, Steel Shiva privacy, secure shopping, GDPR compliance, personal data protection, information security, ecommerce privacy policy, online shopping security, customer data policy, website terms, cookies policy, safe transactions, secure checkout, data usage policy" />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Privacy Policy - Your Data Protection & Security | Steel Shiva" />
        <meta property="og:description" content="Learn how Steel Shiva protects your data while shopping for steel almirahs, wardrobes, and storage furniture. Your privacy and security are our priority." />
        <meta property="og:image" content="/images/steelshiva-privacy.jpg" />
        <meta property="og:url" content="https://steelshiva.com/privacy-policy" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - Your Data Protection & Security | Steel Shiva" />
        <meta name="twitter:description" content="Read about how Steel Shiva ensures your data is safe while shopping for premium steel almirahs and storage furniture. Your privacy matters to us." />
        <meta name="twitter:image" content="/images/steelshiva-privacy.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/privacy-policy" />
      </Head>
        <div className="container">
            <div className="row">
            <PageHeading PageTitle="PRIVACY & POLICY"/>
            <motion.div
      className="privacy-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        At Kanika Almirah, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        1. Information We Collect
      </motion.h2>
      <motion.ul
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <li>Personal details such as name, email, phone number, and address.</li>
        <li>Payment details for order processing (secured and not stored).</li>
        <li>Browsing behavior on our website using cookies.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        2. How We Use Your Information
      </motion.h2>
      <motion.ul
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <li>To process orders and provide customer support.</li>
        <li>To send promotional emails with your consent.</li>
        <li>To improve website experience through analytics.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        3. Data Protection & Security
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        We take data security seriously and implement measures such as encryption and secure payment gateways to protect your information.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        4. Cookies & Tracking
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        We use cookies to improve your browsing experience and understand user behavior. You can disable cookies in your browser settings.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        5. Third-Party Sharing
      </motion.h2>
      <motion.ul
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <li>We do not sell or share personal data with third parties.</li>
        <li>We may share necessary details with delivery partners for order fulfillment.</li>
        <li>Legal compliance may require us to share data with authorities.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        6. Your Rights & Choices
      </motion.h2>
      <motion.ul
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <li>You can request access, correction, or deletion of your data.</li>
        <li>You can opt out of promotional communications anytime.</li>
        <li>You have the right to request details on how your data is used.</li>
      </motion.ul>

      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        7. Contact Us
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      >
        If you have any questions regarding our Privacy Policy, contact us at <strong>support@kanikaalmirah.com</strong>.
      </motion.p>
    </motion.div>
            </div>
        </div>
    </>
   
  );
};

export default page;
