"use client";
import React, { useEffect, useState } from "react";
import "./feproduct.css";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "../Heading/heading";

import Link from "next/link";
import { axiosInstance } from "@/services/auth";

const Feproduct = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,

    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [products, setProduct] = useState([]);

  const getFeatureProduct = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/product/get-feature-products"
      );
      setProduct(response?.data?.featureProducts);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "feature product error");
    }
  };
  useEffect(() => {
    getFeatureProduct();
  }, []);

  return (
    <>
      <section className=" fe-product-bg py-3">
        <div className="container">
          <Heading heading="FEATURE PRODUCTS" />

          <Slider {...settings}>
            {products?.map((product) => (
              <div key={product?._id} className="card m-auto">
                <div className="feproductImage">
                  <Image
                    src={product?.coverImage}
                    alt={product?.productName}
                    className="feInnerImage"
                    width={300}
                    height={300}
                  />
                </div>
                <h3 className="feproductName">
                  {product.productName.length > 25
                    ? product.productName.slice(0, 25) + "..."
                    : product.productName}
                </h3>
                <p
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.description.length > 160
                        ? product.description.slice(0, 160) + "..."
                        : product.description,
                  }}
                ></p>
                <div className="price">
                  <p className="oldPrice">Rs {product?.price}</p>{" "}
                  <p className="newPrice">
                    Rs{" "}
                    {parseFloat(
                      product?.price * (1 - product?.discount / 100)
                    ).toFixed(0)}
                  </p>
                </div>
                <div className="Buy-btn">
                  <Link href={`/products/${product?._id}`}>
                    <button>Grab Now</button>
                  </Link>
                </div>
                <Link href="/">
                  <i className="bi bi-star-fill"></i>{" "}
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Feproduct;
