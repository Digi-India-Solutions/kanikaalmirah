// ✅ KEEP THIS SERVER COMPONENT
import Navbar from "@/components/Navbar/navbar";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import Top from "@/components/ScrollToTop/top";
import Footer from "@/components/Footer/footer";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";

export const metadata = {
  title: "KANIKA ALMIRAH | Best Luxury Premium Almirah in India",
  description:
    "Shop high-quality steel almirahs, wardrobes, and premium metal furniture at Steel Shiva. Secure shopping, best prices, and fast delivery. Explore our collection now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthWrapper>
            <Navbar />
            <Top />
            {children}
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthWrapper>
        </ReduxProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
