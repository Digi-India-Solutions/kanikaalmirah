import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, {
  getData,
  postData,
} from "../../services/FetchNodeServices.js";
import { Autocomplete, TextField } from "@mui/material";
import "./product.css";
import { fileLimit } from "../../services/fileLimit.js";
const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    productDescription: "",
    coverImage: "",
    images: [],
    doors: "",
    material: "",
    price: "",
    size: "",
    discount: "",
    isFeaturedProduct: "",
    stock: "",
    colorName: "",
  });

  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/category/get-all-categories"
      );
      if (response?.status === 200) {
        setCategoryList(response.data.categories);
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "Error fetching Category data"
      );
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoditChange = (newValue) => {
    setFormData((prev) => ({ ...prev, productDescription: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.categoryId) {
      toast.error("category is required");
      return;
    }
    if (!fileLimit(formData?.coverImage)) return;
    if (formData.images && Array.isArray(formData.images)) {
      for (const image of formData.images) {
        if (!fileLimit(image)) {
          setIsLoading(false);
          return;
        }
      }
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          payload.append(key, item);
        });
      } else {
        payload.append(key, value);
      }
    });
    payload.append("description", formData.productDescription);
    payload.append("category", formData.categoryId);
    try {
      const response = await axiosInstance.post(
        "/api/v1/product/create-product",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("product created success");
        navigate("/all-products");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: [...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  useEffect(() => {
    let total = parseFloat(
      formData.price * (1 - formData.discount / 100)
    ).toFixed(2);
    setFormData((prev) => ({ ...prev, finalPrice: total }));
  }, [formData.price, formData.discount]);
  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Product</h4>
        </div>
        <div className="links">
          <Link to="/all-products" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          {/* <div className="col-md-3">
            <label className="form-label">Product Image*</label>
            <input type="file" className="form-control" multiple onChange={handleFileChange} required />
          </div> */}

          <div className="col-md-3">
            <label className="form-label">Product Name*</label>
            <input
              type="text"
              name="productName"
              className="form-control"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">material*</label>
            <input
              type="text"
              name="material"
              className="form-control"
              value={formData.material}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
  <label className="form-label">Doors*</label>
  <input
    type="text"
    name="doors"
    className="form-control"
    list="doorOptions"
    value={formData.doors}
    onChange={handleChange}
    required
  />
  <datalist id="doorOptions">
    <option value="Single Door" />
    <option value="Sliding Doors" />
    <option value="Mirror Door" />
    <option value="Sliding Mirror Door" />
    <option value="Double Door" />
    <option value="Triple Door" />
    <option value="Four Door" />
  </datalist>
</div>

          {/* <div className="col-md-3">
            <label className="form-label">Select Type</label>
            <Autocomplete
              multiple
              options={typeOptions}

              value={typeOptions.filter((opt) => formData.type.includes(opt.name))}
              onChange={(e, newValue) => setFormData((prev) => ({ ...prev, type: newValue.map((opt) => opt.name), }))
              }
              getOptionLabel={(option) => option.name}
              // value={typeOptions.find((opt) => opt.name === formData.type) || null}
              // onChange={(e, value) => setFormData({ ...formData, type: value?.name || "" })}
              renderInput={(params) => <TextField {...params} label="Select Type" />}
            />
          </div> */}

          <div className="col-md-3">
            <label className="form-label">Select Category</label>
            <select
              name="categoryId"
              id=""
              required
              onChange={handleChange}
              value={formData.categoryId}
            >
              <option value="">Select Category</option>
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Cover Image*</label>
            <input
              type="file"
              name="coverImage"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Images</label>
            <input
              type="file"
              multiple
              name="images"
              className="form-control"
              onChange={handleFileChange}
              maxLength={4}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">size*</label>
            <input
              type="text"
              name="size"
              className="form-control"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Product Description*</label>
            <JoditEditor
              value={formData.productDescription}
              onChange={handleJoditChange}
            />
          </div>

          <div className="row">
            {/* <div className="col-md-2">
              <label className="form-label">Color*</label>
              <input
                type="text"
                name="colorName"
                className="form-control"
                value={formData.colorName}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="col-md-2">
              <label className="form-label">Color*</label>
              <input
                type="text"
                name="colorName"
                className="form-control"
                list="colorOptions"
                value={formData.colorName}
                onChange={handleChange}
                required
              />
              <datalist id="colorOptions">
                <option value="White" />
                <option value="Black" />
                <option value="Grey" />
                <option value="Brown" />
                <option value="Beige" />
                <option value="Dark Brown" />
                <option value="Silver" />
                <option value="Gold" />
                <option value="Olive Green" />
                <option value="Navy Blue" />
                <option value="Light Blue" />
                <option value="Maroon" />
                <option value="Cream" />
                <option value="Charcoal" />
                <option value="Teak Wood Finish" />
              </datalist>
            </div>
            <div className="col-md-2">
              <label className="form-label">Price*</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Discount %*</label>
              <input
                type="number"
                name="discount"
                className="form-control"
                value={formData.discountPrice}
                onChange={handleChange}
                min={0}
                max={100}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Final Price*</label>
              <input
                type="number"
                name="finalPrice"
                className="form-control"
                value={formData.finalPrice}
                readOnly
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Stock</label>
              <input
                type="text"
                name="stock"
                className="form-control"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-12 mt-4 text-center">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
