"use client";
import PageHeading from "@/components/PageHeading/pageHeading";
import Product from "@/components/ProductDetail/product";
import React from "react";

const page = () => {
  return (
    <>
      {/* <Head>
      <title>{product.name} - Buy {product.category} at Best Price</title>
      <meta name="description" content={`${product.name} - Buy high-quality ${product.category} at an affordable price. Available in various colors and sizes. Order now!`} />
      <meta name="keywords" content={`buy ${product.name}, ${product.category}, steel almirah online, best wardrobes`} />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.imageUrl} />
      <meta property="og:url" content={`https://kanikaalmirah.com/product/${product.slug}`} />
      <meta property="og:type" content="product" />
    </Head> */}

      <div className="container">
        <div className="row">
          <PageHeading PageTitle="PRODUCTS DESCRIPTION" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Product />
        </div>
      </div>
    </>
  );
};

export default page;
