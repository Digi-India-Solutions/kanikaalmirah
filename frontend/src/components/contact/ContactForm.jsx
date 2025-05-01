"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactForm.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { contactEnquiry } from "@/redux/slices/contactSlice";

export default function ContactForm() {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(
    (state) => state.contact
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "general",
  });

  const [localSubmitted, setLocalSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      FullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      EnquiryType: formData.enquiryType,
      subject: formData.subject,
      message: formData.message,
    };

    const resultAction = await dispatch(contactEnquiry(payload));

    if (contactEnquiry.fulfilled.match(resultAction)) {
      setLocalSubmitted(true);
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        enquiryType: "general",
      });
    } else {
      toast.error("Failed to send your message. Please try again later.");
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Send us a Message</h2>
      <p className="form-subtitle">
        Fill out the below form for Dealership & General Enquiries.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-container">
              <i className="bi bi-person input-icon"></i>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <i className="bi bi-envelope input-icon"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-container">
              <i className="bi bi-phone input-icon"></i>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="enquiryType">Enquiry Type</label>
            <div className="input-container">
              <i className="bi bi-chat-dots input-icon"></i>
              <select
                id="enquiryType"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                required
              >
                <option value="general">General Enquiry</option>
                <option value="product">Product Information</option>
                <option value="delar">Dealership Information</option>
                <option value="support">Repairing Support</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <div className="input-container">
            <i className="bi bi-tag input-icon"></i>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter message subject"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <div className="input-container">
            <i className="bi bi-pencil text-input-icon"></i>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows="5"
              required
            ></textarea>
          </div>
        </div>

        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="bi bi-hourglass-split"></i> Sending...
            </>
          ) : localSubmitted ? (
            <>
              <i className="bi bi-check-circle"></i> Message Sent!
            </>
          ) : (
            <>
              <i className="bi bi-send"></i> Send Message
            </>
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {localSubmitted && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <i className="bi bi-check-circle"></i>
            {successMessage || "Thank you for your message!"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
