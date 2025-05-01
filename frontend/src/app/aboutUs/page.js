import React from "react";
import PageHeading from "../../components/PageHeading/pageHeading";
import StoryTimeline from "../../components/StoryTimeLine/storytimeline";
import StatsCounter from "@/components/StateCount/statecount";
import TestimonialsSection from "@/components/Testimonial/testimonial";
import FEQ from "@/components/F&Q/f&q";
import Head from 'next/head';


const page = () => {
  return (
    <>

<Head>
        <title>About Kanika Almirah - Best Steel Almirah & Wardrobe Brand</title>
        <meta name="description" content="Kanika Almirah is India's top brand for steel almirahs, wooden wardrobes, and modern storage solutions. Buy durable, stylish, and affordable almirahs online." />
        <meta name="keywords" content="about Kanika Almirah, best steel almirah brand, buy wooden wardrobe online, modern almirah designs, steel cupboard for home, home storage solutions, metal almirah manufacturer, almirah company in India, customized steel wardrobes, durable steel furniture, best storage almirah online, modern wardrobe for bedroom" />
        <meta name="author" content="Kanika Almirah" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="About Kanika Almirah - Best Steel Almirah & Wardrobe Brand" />
        <meta property="og:description" content="Kanika Almirah is a leading brand offering premium steel almirahs, wooden wardrobes, and metal storage solutions at the best prices." />
        <meta property="og:image" content="/images/kanika-almirah-about.jpg" />
        <meta property="og:url" content="https://steelshiva.com//about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Kanika Almirah - Best Steel Almirah & Wardrobe Brand" />
        <meta name="twitter:description" content="Discover Kanika Almirah – India's top manufacturer of steel almirahs, wardrobes, and storage furniture for homes and offices." />
        <meta name="twitter:image" content="/images/kanika-almirah-about.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com//about" />
      </Head>

      <div className="container">
        <div className="row">
          <PageHeading PageTitle="ABOUT OUR STORE" />
          <div className="animated-background">
            <div className="gradient-blob blob-1"></div>
            <div className="gradient-blob blob-2"></div>
            <div className="gradient-blob blob-3"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <StoryTimeline />
          <StatsCounter />
          <TestimonialsSection />
          <FEQ />
        </div>
      </div>
    </>
  );
};

export default page;
