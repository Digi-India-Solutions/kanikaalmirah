"use client";

import { useRef } from "react";
import Image from "next/image";
import "./testimonial.css";
import Heading from "../Heading/heading";
import people from "../../Assets/testi.jpg";
import people1 from "../../Assets/testi1.jpg";
import people2 from "../../Assets/testi2.webp";

const TestimonialsSection = () => {
  const testimonialsRef = useRef(null);
  // Testimonials data
  const testimonials = [
    {
      name: "Vikram Singh",
      location: "Delhi",
      rating: 5,
      text: "The quality of my steel almirah is exceptional. It's been 5 years and it looks as good as new. The security features give me peace of mind.",
      image: people,
    },
    {
      name: "Ananya Desai",
      location: "Mumbai",
      rating: 5,
      text: "I ordered a customized wardrobe for my new home. The design team was incredibly helpful, and the final product exceeded my expectations.",
      image: people1,
    },
    {
      name: "Karthik Reddy",
      location: "Bangalore",
      rating: 5,
      text: "The customer service is as premium as their products. From selection to installation, everything was handled professionally.",
      image: people2,
    },
  ];

  return (
    <section ref={testimonialsRef} className="py-3">
      <div className="container">
        <div className="row">
          <Heading heading="WHAT OUR CUSTOMERS SAY" />
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="avatar-image"
                    />
                  </div>
                  <div className="testimonial-meta">
                    <h3>{testimonial.name}</h3>
                    <div className="location">
                      <i className="bi bi-geo-alt location-icon"></i>
                      <span>{testimonial.location}</span>
                    </div>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill star-icon"></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
