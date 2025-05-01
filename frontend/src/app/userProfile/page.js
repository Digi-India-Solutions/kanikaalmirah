import PageHeading from "@/components/PageHeading/pageHeading";
import UserProfile from "@/components/UserProfile/userprofile";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <>
      <Head>
        <title>My Account - Manage Your Profile & Orders | Steel Shiva</title>
        <meta
          name="description"
          content="Access your Steel Shiva account to manage your profile, track orders, update personal details, and view purchase history. Secure and easy account management for a seamless shopping experience."
        />
        <meta
          name="keywords"
          content="user profile, my account, Steel Shiva login, order tracking, manage orders, purchase history, update account, edit profile, change password, wishlist, saved items, secure account, shopping preferences, profile settings, account security, personal details, address book, update email, online shopping account, customer dashboard, track shipments, order details, saved payments, ecommerce account"
        />
        <meta name="author" content="Steel Shiva" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="My Account - Manage Your Profile & Orders | Steel Shiva"
        />
        <meta
          property="og:description"
          content="Manage your Steel Shiva profile, update details, track orders, and view your shopping history. Secure your account for a better experience!"
        />
        <meta property="og:image" content="/images/steelshiva-profile.jpg" />
        <meta property="og:url" content="https://steelshiva.com/profile" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="My Account - Manage Your Profile & Orders | Steel Shiva"
        />
        <meta
          name="twitter:description"
          content="Securely manage your account, track orders, and update your profile at Steel Shiva. Your one-stop dashboard for a seamless shopping experience."
        />
        <meta name="twitter:image" content="/images/steelshiva-profile.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://steelshiva.com/profile" />
      </Head>

      <div className="container">
        <div className="row">
          <PageHeading PageTitle="USER DETAILS" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <UserProfile />
        </div>
      </div>
    </>
  );
};

export default page;
