"use client";

import { motion } from "framer-motion";
import "./ContactInfo.css";

export default function ContactInfo() {
  const contactDetails = {
    address: "Shiva City, Haryana",
    email: "info@steelshiva.com",
    phone: "+91 9312217117",
    deal: "Dealership customer, please fill out the form.",
    workingHours: {
      weekdays: "Monday - Friday: 9:00 AM - 8:00 PM",
      saturday: "Saturday: 10:00 AM - 6:00 PM",
      sunday: "Sunday: Closed",
    },
    socialMedia: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  };

  return (
    <div className="contact-info">
      <div className="info-section">
        <h3>Visit Our Store</h3>
        <div className="info-content">
          <div className="info-item">
            <i className="bi bi-geo-alt"></i>
            <div>
              <h4>Address</h4>
              <p>{contactDetails.address}</p>
            </div>
          </div>

          <div className="info-item">
            <i className="bi bi-envelope"></i>
            <div>
              <h4>Email</h4>
              <a href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </div>
          </div>

          <div className="info-item">
            <i className="bi bi-telephone"></i>
            <div>
              <h4>Phone</h4>
              <a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a>
            </div>
          </div>

          <div className="info-item">
            <i className="bi bi-hand-thumbs-up"></i>
            <div>
              <h4>Dealership</h4>
              <p className="text-danger">{contactDetails.deal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Business Hours</h3>
        <div className="business-hours">
          <div className="hours-item">
            <i className="bi bi-clock"></i>
            <span>{contactDetails.workingHours.weekdays}</span>
          </div>
          <div className="hours-item">
            <i className="bi bi-clock"></i>
            <span>{contactDetails.workingHours.saturday}</span>
          </div>
          <div className="hours-item closed">
            <i className="bi bi-clock"></i>
            <span>{contactDetails.workingHours.sunday}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Connect With Us</h3>
        <div className="social-links">
          <motion.a
            href={contactDetails.socialMedia.facebook}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="social-link facebook"
          >
            <i className="bi bi-facebook"></i>
          </motion.a>

          <motion.a
            href={contactDetails.socialMedia.twitter}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="social-link twitter"
          >
            <i className="bi bi-twitter"></i>
          </motion.a>

          <motion.a
            href={contactDetails.socialMedia.instagram}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="social-link instagram"
          >
            <i className="bi bi-instagram"></i>
          </motion.a>
        </div>
      </div>

      <div className="support-card">
        <div className="support-icon">
          <i className="bi bi-headset"></i>
        </div>
        <div className="support-content">
          <h3>Need Urgent Help?</h3>
          <p>Our support team is available 24/7</p>
          <a href="tel:9312217117" className="support-button">
            <i className="bi bi-telephone"></i>
            Dealership Enquiry
          </a>
        </div>
      </div>
    </div>
  );
}
