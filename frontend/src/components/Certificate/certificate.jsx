"use client";

import Image from "next/image";
import Heading from "../Heading/heading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { certificateImages } from "@/redux/slices/authSlice";
import "./certificate.css";

const Certificate = () => {
  const dispatch = useDispatch();
  const { certificates, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(certificateImages());
  }, [dispatch]);

  if (loading)
    return <p className="text-center py-4">Loading certificates...</p>;
  if (error)
    return <p className="text-center py-4 text-danger">Error: {error}</p>;

  return (
    <>
      <div className="container py-4">
        <div className="row">
          <Heading heading="OUR CERTIFICATES" />
        </div>
      </div>

      <div className="container">
        <div className="certificates-grid">
          {certificates?.length > 0 &&
            certificates.map((cert) => (
              <div key={cert._id} className="certificate-card">
                <div className="certificate-image-wrapper">
                  <Image
                    src={cert.certificateImage}
                    alt="Certificate"
                    width={300}
                    height={400}
                    className="certificate-image"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Certificate;
