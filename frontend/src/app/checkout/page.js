"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./checkout.css";
import ShippingForm from "@/components/CheckOutProcess/ShippingForm";
import OrderReview from "@/components/CheckOutProcess/OrderReview";
import OrderConfirmation from "@/components/CheckOutProcess/OrderConfirmation";
import OrderSummary from "@/components/CheckOutProcess/OrderSummary";
import CheckoutProgress from "@/components/CheckOutProcess/CheckoutProgress";
import PageHeading from "@/components/PageHeading/pageHeading";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { allCoupons, checkUserAuth } from "@/redux/slices/authSlice";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    landmark: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  useEffect(()=>{
  dispatch(checkUserAuth())
    },[])
    useEffect(() => {
      if(loading) return
      if (!loading && (!user || !user.email)) {
        router.push("/login");
      }else{
      dispatch(fetchCartItems())

      }
    }, [loading]);

    // if (loading || !user || !user.email) {
    //   return (
    //     <div className="flex justify-center items-center h-screen">
    //       <h1>Loading...</h1>
    //     </div>
    //   );
    // }

  // Sample order items - in a real app, this would come from your cart state/API
  const orderItems = items;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
          />
        );
      // case 2:
      //   return (
      //     <PaymentMethod
      //       formData={formData}
      //       handleInputChange={handleInputChange}
      //       nextStep={nextStep}
      //       prevStep={prevStep}
      //     />
      //   );
      case 2:
        return (
          <OrderReview
            formData={formData}
            orderItems={orderItems}
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormData}
          />
        );
      case 3:
        return <OrderConfirmation orderItems={orderItems} />;
      default:
        return (
          <ShippingForm
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <>
      <Head>
        <title>
          Secure Checkout - Buy Steel Almirah, Wardrobes & Metal Furniture |
          Steel Shiva
        </title>
        <meta
          name="description"
          content="Complete your purchase securely at Steel Shiva. Order premium steel almirahs, wardrobes, and metal furniture with fast shipping and safe payment options."
        />
        <meta
          name="keywords"
          content="checkout, secure checkout, buy steel almirah, metal furniture payment, best steel almirah online, wardrobe purchase, home storage solutions, steel cupboard buy online, furniture checkout page, customized steel wardrobe order, office storage checkout, metal storage solutions, fast shipping furniture, buy durable steel almirah"
        />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Secure Checkout - Buy Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva"
        />
        <meta
          property="og:description"
          content="Order steel almirahs, wardrobes, and storage furniture securely at Steel Shiva. Fast shipping, easy payments, and best quality guaranteed!"
        />
        <meta property="og:image" content="/images/steelshiva-checkout.jpg" />
        <meta property="og:url" content="https://steelshiva.com/checkout" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Secure Checkout - Buy Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva"
        />
        <meta
          name="twitter:description"
          content="Complete your purchase of premium steel almirahs, wardrobes, and storage solutions securely at Steel Shiva with fast shipping and safe payment options."
        />
        <meta name="twitter:image" content="/images/steelshiva-checkout.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/checkout" />
      </Head>

      <div className="container">
        <div className="row">
          <PageHeading PageTitle="CHECK OUT" />
        </div>
      </div>
      <div className="container">
        {currentStep < 4 && <CheckoutProgress currentStep={currentStep} />}

        <div className="checkout-container">
          <div className="checkout-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {currentStep < 4 && (
            <div className="checkout-sidebar">
              <OrderSummary orderItems={orderItems} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
