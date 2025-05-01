"use client";

import { motion } from "framer-motion";
import "./CheckoutProgress.css";

export default function CheckoutProgress({ currentStep }) {
  const steps = [
    { number: 1, name: "Shipping" },
    { number: 2, name: "Review" },
  ];

  return (
    <div className="checkout-progress">
      {steps.map((step,index) => (
        <div
          key={index}
          className={`progress-step ${
            currentStep >= step.number ? "active" : ""
          }`}
        >
          <div className="step-connector">
            {step.number > 1 && (
              <motion.div
                className="connector-line"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: currentStep >= step.number ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            )}
          </div>

          <div className="step-circle-container">
            <motion.div
              className="step-circle"
              initial={{ scale: 0.8 }}
              animate={{
                scale: 1,
                backgroundColor:
                  currentStep >= step.number ? "#0070f3" : "#e9ecef",
              }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > step.number ? (
                <i className="bi bi-check-lg"></i>
              ) : (
                <span>{step.number}</span>
              )}
            </motion.div>
            <div className="step-label">{step.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
