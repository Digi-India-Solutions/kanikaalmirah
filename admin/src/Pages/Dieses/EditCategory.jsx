import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { getData, postData, serverURL } from "../../services/FetchNodeServices";
import JoditEditor from "jodit-react";
import { Autocomplete, TextField } from "@mui/material";
import { fileLimit } from "../../services/fileLimit";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    status: false,
    oldImage: null,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/category/get-single-category/${id}`);
 
        if (response?.status === 200) {
          setFormData({
            name: response?.data?.category?.categoryName || "",
            status: response?.data?.category?.showOnHome || false,
            oldImage: response?.data?.category?.categoryImage || null,
            image: null,
          });
        }
      } catch (error) {
        toast.error("Error fetching category data");
        console.error("Fetch category error:", error);
      }
    };

    fetchCategory();
  }, [id]);


  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, status: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
if(!fileLimit(formData?.image)) return;
    const payload = new FormData();
    payload.append("categoryName", formData.name);
    if (formData.image) {
      payload.append("image", formData.image);
    }
    payload.append("showOnHome", formData.status);
    try {
      const response = await axiosInstance.put(`/api/v1/category/update-category/${id}`, payload,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     if(response.status===200){
      toast.success(response?.data?.message || "Category updated successfully");
      navigate("/all-category");
     }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating category");
      console.error("Update category error:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Category</h4>
        </div>
        <div className="links">
          <Link to="/all-dieses" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Category Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
            />
            {formData.oldImage && (
              <img
                src={`${formData.oldImage}`}
                alt="Old"
                width="100"
                style={{ marginTop: "10px" }}
              />
            )}
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="status"
                id="status"
                checked={formData.status}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="status">
                Active on Homepage
              </label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-success"
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
