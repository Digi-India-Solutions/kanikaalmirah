"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./GoogleMap.css";

export default function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <iframe
          width="100%"
          height="400"
          style="border:0;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27994.84291713423!2d77.01331860392972!3d28.708924080174725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d066dbef3d653%3A0x50ad5f2d60dabf05!2sMubarakpur%20Dabas%2C%20Delhi%2C%20110081!5e0!3m2!1sen!2sin!4v1740648973058!5m2!1sen!2sin">
        </iframe>
      `;
    }
  }, []);

  return (
    <div className="map-section">
      <div className="map-header">
        <h2>Our Location</h2>
        <div className="map-actions">
          <a
            href="https://maps.app.goo.gl/wXSnqjUqDmKsztes6"
            target="_blank"
            rel="noopener noreferrer"
            className="map-button"
          >
            <i className="bi bi-geo-alt"></i>
            Get Directions
          </a>
        </div>
      </div>

      <motion.div
        className="map-container"
        ref={mapRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Google Maps will be dynamically loaded here */}
      </motion.div>

      <div className="map-footer">
        <div className="location-info">
          <i className="bi bi-pin-map"></i>
          <div>
            <h3>Store Address</h3>
            <p>Shiva City, Haryana</p>
          </div>
        </div>

        <div className="location-info">
          <i className="bi bi-clock"></i>
          <div>
            <h3>Opening Hours</h3>
            <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
          </div>
        </div>

        <div className="location-info">
          <i className="bi bi-telephone"></i>
          <div>
            <h3>Contact</h3>
            <p>+91 9312217117</p>
          </div>
        </div>
      </div>
    </div>
  );
}
