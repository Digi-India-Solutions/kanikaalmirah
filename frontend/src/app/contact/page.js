"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/contact/GoogleMap";
import "./contact.css";
import PageHeading from "@/components/PageHeading/pageHeading";
import Head from "next/head";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (formData) => {
    // In a real application, you would handle the form submission here
  
    setFormSubmitted(true);

    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <>

<Head>
        <title>Contact Us - Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva</title>
        <meta name="description" content="Get in touch with Steel Shiva for inquiries about steel almirahs, wardrobes, and metal furniture. Contact us for product details, bulk orders, and customer support." />
        <meta name="keywords" content="contact us, steel almirah customer support, buy metal furniture online, steel wardrobe inquiry, best steel furniture supplier, home storage solutions, steel cupboard contact, furniture supplier India, bulk order steel furniture, durable almirah supplier, steel storage solutions, modern almirah designs, office furniture supplier" />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Contact Us - Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva" />
        <meta property="og:description" content="Need help? Contact Steel Shiva for details on our steel almirahs, wardrobes, and metal furniture. Get expert support and assistance for your order today!" />
        <meta property="og:image" content="/images/steelshiva-contact.jpg" />
        <meta property="og:url" content="https://steelshiva.com/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva" />
        <meta name="twitter:description" content="Reach out to Steel Shiva for inquiries about our steel almirahs, wardrobes, and storage furniture. Get expert assistance today!" />
        <meta name="twitter:image" content="/images/steelshiva-contact.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/contact" />
      </Head>
      
      <div className="container">
        <div className="row">
          <PageHeading PageTitle="GET IN TOUCH" />
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          <motion.div
            className="contact-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm
              onSubmit={handleFormSubmit}
              formSubmitted={formSubmitted}
            />
          </motion.div>

          <motion.div
            className="contact-sidebar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GoogleMap />
        </motion.div>
      </div>
    </>
  );
}
