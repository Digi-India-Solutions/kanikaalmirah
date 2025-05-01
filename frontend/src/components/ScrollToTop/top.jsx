"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation"; // ✅ Correct way in Next.js
import AOS from "aos";
import "aos/dist/aos.css";

const Top = () => {
  const location = usePathname();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [location]);

  const { pathname } = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default Top;


