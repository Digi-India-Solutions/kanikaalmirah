"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReelSection.module.css"; // CSS Module
import Heading from "../Heading/heading";
import { axiosInstance } from "@/services/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, AddToCartToServer } from "@/redux/slices/cartSlice";


// Utility to check if device is mobile
const isMobile = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768;
  }
  return false;
};

export default function ReelSection() {
  const videoRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
const [videoData, setVideoData] = useState([]);
const handleMouseEnter = async (index) => {
  if (!isMobile()) {
    for (let i = 0; i < videoRefs.current.length; i++) {
      const video = videoRefs.current[i];
      if (video) {
        if (i === index) {
          try {
            await video.play();
          } catch (error) {
            console.warn("Play failed:", error);
          }
        } else {
          video.pause();
        }
      }
    }
  }
};

  const handleMouseLeave = () => {
    if (!isMobile()) {
      videoRefs.current.forEach((video) => video && video.pause());
    }
  };

  const {user}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  // ✅ Autoplay videos on mobile when component mounts
  useEffect(() => {
    if (isMobile()) {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play().catch((e) => {
            console.warn("Autoplay failed:", e);
          });
        }
      });
    }
  }, []);

  const handleAddToCart = (selectedProduct) => {
    let quantity=1
    if(quantity > selectedProduct.stock){
      toast.error("Out of stock");
      return;
    }
 
  if(user?.email){
    dispatch(AddToCartToServer({productId:selectedProduct._id,quantity}))
    toast.success("Product added to cart",{
      position: "top-center",
    });

  }else{
    dispatch(addToCart({ productId: selectedProduct._id, quantity,image:selectedProduct.coverImage,price:selectedProduct.price * (selectedProduct.discount / 100),name:selectedProduct.productName,color:selectedProduct.colorName,size:selectedProduct.size,stock:selectedProduct.stock }));
    toast.success("Product added to cart",{
      position: "bottom-right",
    });
  }
  };
  const fetchVideos=async()=>{
    try{
      const response=await axiosInstance.get("/api/v1/video/get-all-videos");
  
      setVideoData(response?.data?.videos);
    }catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  }

  useEffect(() => {
    fetchVideos()
  },[])
  return (
    <section className="reel-section">
      <div className="container">
        <Heading heading="COLLECTIONS" />

        <div className="row g-3">
          {videoData.map((item, index) => (
            <div
              key={index}
              className={`col-md-2 col-sm-4 col-6 d-flex flex-column align-items-center position-relative ${
                styles.videoContainer
              } ${expandedIndex === index ? styles.expanded : ""}`}
            >
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`d-flex flex-column align-items-center position-relative ${
                  styles.videoContainer
                } ${expandedIndex === index ? styles.expanded : ""}`}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item?.videoUrl}
                  muted
                  loop
                  playsInline
                  className={`${styles.videoElement} rounded shadow-sm`}
                />

                <div
                  className={`position-absolute bottom-0 start-0 w-100 p-2 bg-dark d-flex bg-opacity-75 text-white justify-content-center rounded-bottom ${styles.overlay}`}
                >
                  <div className="ms-2 d-grid">
                    <p className="fw-bold">{item?.productId?.productName}</p>
                    <p className="fw-bold">₹ {item?.productId?.finalPrice.toFixed(0)}</p>
                  <button className="btn btn-success btn-sm" onClick={()=>handleAddToCart(item.productId)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
