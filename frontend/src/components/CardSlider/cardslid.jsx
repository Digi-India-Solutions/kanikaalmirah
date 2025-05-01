"use client";

import React, { useState, useEffect } from "react";
import "./cardslid.css";
import Heading from "../Heading/heading";

const Cardslide = () => {
  const cardData = [
    {
      id: 1,
      bgColor: "#06688b",
      icon: <i className="bi bi-tools"></i>,
      title: "Easy Repair & Installation",
      desc: "Hassle-free repair and installation services for all your almirah needs. Our experts ensure quick and efficient solutions right at your doorstep.",
    },

    {
      id: 2,
      bgColor: "#0c0e2b",
      icon: <i className="bi bi-paint-bucket"></i>,
      title: "Luxury Shine Paint",
      desc: "Give your almirah a stunning makeover with our premium luxury shine paint. Long-lasting, vibrant, and designed to elevate your home decor.",
    },

    {
      id: 3,
      bgColor: "#1597BB",
      icon: <i className="bi bi-house-door-fill"></i>,
      title: "Perfect Fit Anywhere",
      desc: "Designed to seamlessly blend into any corner or space in your home, our almirahs offer both style and functionality without compromise.",
    },

    {
      id: 4,
      bgColor: "#197fd8",
      icon: <i className="bi bi-rocket-takeoff"></i>,
      title: "Trending Stylish Almirah",
      desc: "Upgrade your space with our modern and stylish almirahs, designed to keep you organized while adding a touch of elegance to your home.",
    },

    {
      id: 5,
      bgColor: "#0c3f51",
      icon: <i className="bi bi-gem"></i>,
      title: "Premium Quality Finish",
      desc: "Crafted with precision and elegance, our almirahs offer a gem-like shine and durability that transforms your living space into a luxurious haven.",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(2);

  const next = () =>
    activeSlide < cardData.length - 1 && setActiveSlide(activeSlide + 1);
  const prev = () => activeSlide > 0 && setActiveSlide(activeSlide - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % cardData.length);
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [cardData.length]);

  const getStyles = (index) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <>
      <section className="hide-mobile py-4">
        <Heading heading="WHY FROM US" />
        <div className="slideC">
          {cardData.map((item, i) => (
            <React.Fragment key={item.id}>
              <div
                className="cardslide"
                style={{
                  background: item.bgColor,
                  boxShadow: `0 5px 20px ${item.bgColor}30`,
                  ...getStyles(i),
                }}
              >
                <div className="sliderContent">
                  <h2>{item.icon}</h2>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              <div
                className="reflection"
                style={{
                  background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                  ...getStyles(i),
                }}
              />
            </React.Fragment>
          ))}
        </div>

        <div className="btns">
          <i
            className="bi bi-caret-left-square"
            onClick={prev}
            disabled={activeSlide === 0}
            color="#fff"
            size="2x"
          ></i>
          <i
            className="bi bi-caret-right-square"
            onClick={next}
            disabled={activeSlide === cardData.length - 1}
            color="#fff"
            size="2x"
          ></i>
        </div>
      </section>
    </>
  );
};

export default Cardslide;
