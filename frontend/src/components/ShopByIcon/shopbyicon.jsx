"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./shopbyicon.css";

const categories = [
  {
    id: 1,
    name: "BEDROOM",
    icon: "bi bi-lamp",

    description:
      "Transform your bedroom into a perfect sanctuary with our furniture collection.",
  },
  {
    id: 2,
    name: "OFFICE",
    icon: "bi bi-briefcase",

    description:
      "Create a productive and professional workspace with our range of ergonomic furniture.",
  },
  {
    id: 3,
    name: "KIDS ROOM",
    icon: "bi bi-dribbble",

    description:
      "Design a fun, safe, and functional space for your little ones with our vibrant kids' room furniture.",
  },
  {
    id: 4,
    name: "LIBRARY",
    icon: "bi bi-book",

    description:
      "Keep your books and essentials neatly organized with our stylish and functional library furniture.",
  },
  {
    id: 5,
    name: "DINING",
    icon: "bi bi-cup-hot",

    description:
      "Enhance your dining experience with our elegant and practical furniture solutions.",
  },
];

const ShopByIcon = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="shop-by-icon-section">
      <div className="section-background">
        <div className="gradient-overlay"></div>
        <div className="pattern-overlay"></div>
      </div>

      <div className="container shop-icon-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header text-center"
        >
          <h2>SHOP BY PLACE</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="categories-grid"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="category-wrapper"
            >
              <div className="category-card">
                <div className="card-content">
                  <div className="icon-wrapper">
                    <i className={category.icon}></i>
                  </div>
                  <h3>{category.name}</h3>
                  <p className="by-icon-description">{category.description}</p>
                </div>
                <div className="card-shine"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByIcon;
