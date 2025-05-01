import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/FetchNodeServices";

const AllInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/inquiry/get-all-inquiries");
      if (response.status === 200) {
        setInquiries(response.data.inquiries);
      } else {
        console.error("Failed to fetch inquiries:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <>
      <div className="bread">
        <div className="head">
          <h4>All Inquiries</h4>
        </div>
      </div>

      <section className="main-table">
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Enquiry Type</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry, index) => (
                  <tr key={inquiry._id}>
                    <td>{index + 1}</td>
                    <td>{inquiry.FullName}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.phone}</td>
                    <td>{inquiry.EnquiryType}</td>
                    <td>{inquiry.subject}</td>
                    <td >{inquiry.message}</td>
                    <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AllInquiries;
