"use client"
import Image from "next/image";
import React, { useEffect } from "react";
import "./popcate.css";
import Heading from "../Heading/heading";
import Link from "next/link";
import product1 from "../../Assets/Almirah1.png";
import product2 from "../../Assets/Almirah2.png";
import product3 from "../../Assets/Almirah4bgr.png";
import product4 from "../../Assets/Almirah5bgr.png";
import product5 from "../../Assets/Almirah6bgr.png";
import product6 from "../../Assets/Almirah7bgr.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeCategory } from "@/redux/slices/categorySlice";
const PopCate = () => {

  const dispatch=useDispatch()
const {homeCategory}=useSelector((state)=> state.category)


useEffect(()=>{
dispatch(fetchHomeCategory())
},[dispatch])


  return (
    <>
      <section className="bg-img py-3">
        <div className="container">
          <div className="row justify-content-center">
            <Heading heading="EXPLORE OUR ALMIRAH RANGE" />
            {homeCategory && homeCategory?.slice(0, 8)?.map((category,i) => (
              <div
                key={category?._id}
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay={(i+1) * 100}
              >
                <div className="productCard">
                  <Link href={`/product-by-category/${category?._id}`} className="text-decoration-none">
                    <div className="productImage">
                      <Image
                        src={category.categoryImage || "/placeholder.svg"}
                        alt={category.categoryName}
                        className="innerImage"
                        width={300}
                        height={300}
                        priority={(i+1) <= 4} // Load first 4 images immediately
                      />
                    </div>
                  </Link>
                  <h3 className="productName">{category?.categoryName.toUpperCase()}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopCate;
