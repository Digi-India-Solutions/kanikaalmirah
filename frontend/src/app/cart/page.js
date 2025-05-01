import CartPage from "@/components/CartPage/cartPage";
import PageHeading from "@/components/PageHeading/pageHeading";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <>

<Head>
        <title>Shopping Cart - Buy Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva</title>
        <meta name="description" content="View and manage your shopping cart at Steel Shiva. Buy the best steel almirahs, wardrobes, metal furniture, and home storage solutions at affordable prices." />
        <meta name="keywords" content="shopping cart, steel almirah cart, buy metal furniture online, best steel almirah, wardrobe shopping, home storage solutions, steel cupboard online, furniture cart, customized steel wardrobe, office storage furniture, modern almirah designs, metal storage solutions, checkout steel almirah, durable furniture online" />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Shopping Cart - Buy Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva" />
        <meta property="og:description" content="Your shopping cart at Steel Shiva – Find the best steel almirahs, metal wardrobes, and storage furniture for your home and office." />
        <meta property="og:image" content="/images/steelshiva-cart.jpg" />
        <meta property="og:url" content="https://steelshiva.com/cart" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shopping Cart - Buy Steel Almirah, Wardrobes & Metal Furniture | Steel Shiva" />
        <meta name="twitter:description" content="View your shopping cart at Steel Shiva. Buy high-quality steel almirahs, wardrobes, and storage furniture at the best prices." />
        <meta name="twitter:image" content="/images/steelshiva-cart.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/cart" />
      </Head>
      
      <div className="container">
        <div className="row">
          <PageHeading PageTitle="YOUR CART" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <CartPage />
        </div>
      </div>
    </>
  );
};

export default page;
