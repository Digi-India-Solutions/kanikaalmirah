import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { getData, postData } from "../../services/FetchNodeServices";
import { fileLimit } from "../../services/fileLimit";

const EditCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sizeData, setSizeData] = useState({ size: "", status: false });
    const [image, setImage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/certificate/get-certificate/${id}`);
        if (response?.status===200) {
          setSizeData({
            ...response.data,
            size: response.data.certificateImage,
            status: response.data.isActive,
          });
        }
      } catch (error) {
        toast.error(
          error.response
            ? error.response.data.message
            : "Error fetching size data"
        );
      }
    };

    fetchSize(); 
  }, [id]);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setSizeData(prev => ({ ...prev, status: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true); 
const payload=new FormData();
if(image){
  if(!fileLimit(image)) return;
  payload.append("image", image);
}
// payload.append("isActive", sizeData.status);
  
    try {
      const response = await axiosInstance.put(`/api/v1/certificate/update-certificate/${id}`, payload,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        navigate("/all-certificate");
      }
      
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Error updating size"
      );
    } finally {
      setBtnLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Certificate</h4>
        </div>
        <div className="links">
          <Link to="/all-certificate" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <label htmlFor="image" className="form-label">
              Certificate
            </label>
            <input type="file" name="image" className="form-control" id="image" onChange={handleChange}  />
          </div>
          {/* <div className="col-md-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="status" checked={sizeData.status} onChange={handleCheckboxChange} />
              <label className="form-check-label" htmlFor="status">
                Active
              </label>
            </div>
          </div> */}

          <div className="col-12 text-center">
            <button
              type="submit"
              disabled={btnLoading}
              className={`${btnLoading ? "not-allowed" : "allowed"}`}
            >
              {btnLoading ? "Please Wait..." : "Update Size"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCertificate;
