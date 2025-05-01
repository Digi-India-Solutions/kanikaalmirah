import Cardslide from "@/components/CardSlider/cardslid";
import Certificate from "@/components/Certificate/certificate";
import CtaSection from "@/components/CtaSection/ctaSection";
import FEQ from "@/components/F&Q/f&q";
import Feproduct from "@/components/FeatureProduct/feproduct";
import Hero from "@/components/Hero/hero";
import Hero1 from "@/components/Hero/hero1";
import Hero2 from "@/components/Hero/hero2";
import PopCate from "@/components/PopularCategory/popCate";
import ShopByIcon from "@/components/ShopByIcon/shopbyicon";
import TestimonialsSection from "@/components/Testimonial/testimonial";
import Head from "next/head";
import ReelSection from "@/components/ReelSection/reelSection";
import { useDispatch } from "react-redux";
import { checkAuthUser } from "@/services/auth";

export default function Home() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuthUser());
  // }, [dispatch]);
  return (
    <>
      <Head>
        <title>
          Steel Shiva - Buy Best Steel Almirahs & Metal Furniture Online
        </title>
        <meta
          name="description"
          content="Shop high-quality steel almirahs, wardrobes, and metal storage furniture at Steel Shiva. Secure shopping, best prices, and fast delivery. Explore our durable and stylish collection now!"
        />
        <meta
          name="keywords"
          content="steel almirah, metal furniture, best steel wardrobe, online steel furniture, heavy-duty almirah, storage solutions, home decor, office almirah, steel locker, modern wardrobe, durable steel almirah, industrial storage, almirah price, home storage, bedroom furniture, almirah for sale, custom steel almirah, premium metal furniture, buy steel almirah online, heavy gauge steel furniture, furniture for home and office, affordable steel furniture, long-lasting storage solutions"
        />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Steel Shiva - Buy Best Steel Almirahs & Metal Furniture Online"
        />
        <meta
          property="og:description"
          content="Get the best steel almirahs, metal furniture, and storage solutions at unbeatable prices. Secure online shopping with fast delivery!"
        />
        <meta property="og:image" content="/images/steelshiva-home.jpg" />
        <meta property="og:url" content="https://steelshiva.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Steel Shiva - Best Steel Almirahs & Metal Furniture Online"
        />
        <meta
          name="twitter:description"
          content="Shop premium steel almirahs and metal furniture online at Steel Shiva. Get durable, stylish, and affordable storage solutions for your home and office."
        />
        <meta name="twitter:image" content="/images/steelshiva-home.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/" />
      </Head>
      <Hero />
        <ReelSection/>
        
      <PopCate />
      <ShopByIcon />
      <Feproduct />
      <Hero1 />
      <Certificate />
      <Hero2 />
      <Cardslide />
      <TestimonialsSection />
      <CtaSection />
      <FEQ />
    </>
  );
}
