"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import "./CtaSection.css"

const  CtaSection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to Transform Your Space?</h2>
          <p>Explore our premium collection of steel almirahs and storage solutions</p>
          <div className="cta-buttons">
            <Link href="/products" className="cta-button primary">
              Browse Products
            </Link>
            <Link href="/contact" className="cta-button secondary">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection;