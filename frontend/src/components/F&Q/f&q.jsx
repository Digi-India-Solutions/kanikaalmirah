"use client";
import React, { useState } from "react";
import "./FEQ.css";
import Heading from "../Heading/heading";
import Link from "next/link";

const FEQ = () => {
    const [faq, setFaq] = useState([
        {
          question: "What types of steel almirahs do you offer?",
          answer: "We offer a wide range of steel almirahs, including single-door, double-door, and multi-compartment designs. Our collection includes both modern and traditional styles to suit your home and storage needs.",
          open: false,
        },
        {
          question: "How can I place an order for a steel almirah?",
          answer: "Placing an order is easy! Simply browse our collection, select your desired almirah, add it to your cart, and proceed to checkout. We offer multiple payment options for your convenience.",
          open: false,
        },
        {
          question: "Do you provide home delivery and installation?",
          answer: "Yes, we offer doorstep delivery and optional installation services for all our steel almirahs. Our team ensures safe handling and quick setup at your home.",
          open: false,
        },
        {
          question: "What is your return and refund policy?",
          answer: "We offer a hassle-free 7-day return policy for manufacturing defects or damage during delivery. Refunds are processed within 3-5 business days after the product is returned.",
          open: false,
        },
        {
          question: "Can I customize my steel almirah design?",
          answer: "Yes, we provide customization options such as color, lock type, and internal compartments. Contact our support team to create your perfect storage solution!",
          open: false,
        },
      ]);
      
      

  const toggleFaq = (index) => {
    setFaq(
      faq.map((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        return item;
      })
    );
  };

  return (
    <>
      <section className="py-3">
        <div className="container">
         <Heading heading="Frequently Asked Questions"/>
          <div className="accordion" id="faqAccordion">
            {faq.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      item.open ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={() => toggleFaq(index)}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  className={`accordion-collapse collapse ${
                    item.open ? "show" : ""
                  }`}
                >
                  <div
                    className="accordion-body"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-4">
            Didn’t find the answer you are looking for?{" "}
            <Link href="/contact" className="text-primary">
              Contact our support
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default FEQ;
