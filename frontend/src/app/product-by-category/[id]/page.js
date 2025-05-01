import CategoryProductList from "@/components/CategoryProductList/CategoryProductList";
import PageHeading from "@/components/PageHeading/pageHeading";
import Head from "next/head";
import React from "react";

const page = ({ params }) => {
  const id = params.id;

  return (
    <>
      <Head>
        <title>
          Shop Steel Almirahs, Wardrobes & Metal Furniture | Steel Shiva
        </title>
        <meta
          name="description"
          content="Explore the best collection of steel almirahs, modern wardrobes, and premium metal furniture. Buy durable and stylish storage solutions for homes and offices at Steel Shiva."
        />
        <meta
          name="keywords"
          content="steel almirah, metal almirah, buy steel wardrobe, best steel cupboard, durable storage furniture, steel locker, premium metal furniture, modular wardrobe, home storage solutions, office furniture, high-quality almirah, modern steel furniture, affordable storage cabinets, furniture for small spaces, sturdy metal cupboards, online steel almirah shopping, luxury steel wardrobes, best storage solutions, shop steel almirah online, buy almirah with locker, trending furniture designs, sleek storage options, custom wardrobes, compact home furniture, space-saving almirahs"
        />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Shop Steel Almirahs, Wardrobes & Metal Furniture | Steel Shiva"
        />
        <meta
          property="og:description"
          content="Discover durable steel almirahs, wardrobes, and metal storage furniture. Perfect for homes and offices. Explore now at Steel Shiva!"
        />
        <meta property="og:image" content="/images/steelshiva-products.jpg" />
        <meta property="og:url" content="https://steelshiva.com/products" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Shop Steel Almirahs, Wardrobes & Metal Furniture | Steel Shiva"
        />
        <meta
          name="twitter:description"
          content="Buy high-quality steel almirahs, premium wardrobes, and modern storage furniture at the best prices. Shop now at Steel Shiva!"
        />
        <meta name="twitter:image" content="/images/steelshiva-products.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/products" />
      </Head>

      <div className="container">
        <div className="row">
          <CategoryProductList id={id} />
        </div>
      </div>
    </>
  );
};

export default page;
