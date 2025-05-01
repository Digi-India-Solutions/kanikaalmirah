import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { postData, getData } from "../../services/FetchNodeServices"; // Assuming getData is a function to fetch data

const AddVideos = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ videoFile: null, productId: "" });
    const [previewUrl, setPreviewUrl] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");

    const navigate = useNavigate();

  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("api/v1/product/get-all-products");
                if (response.status === 200) {
                    setProducts(response.data?.products);
                } else {
                    toast.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Error fetching products");
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "videoFile") {
            setFormData((prevData) => ({ ...prevData, videoFile: files[0] }));
            setPreviewUrl(URL.createObjectURL(files[0])); // Set video preview
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.videoFile || !formData.productId) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("video", formData.videoFile);
        formDataToSend.append("productId", formData.productId);

        try {
            const response = await axiosInstance.post("/api/v1/video/create-video", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.status === 201) {
                toast.success(response?.message || "Video added successfully");
                navigate("/all-videos");
            } else {
                toast.error(response?.message || "Failed to add video");
            }
        } catch (error) {
            console.error("Error adding video:", error);
            toast.error("Server error while adding video");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Video</h4>
                </div>
                <div className="links">
                    <Link to="/all-videos" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="productId" className="form-label">
                            Select Product
                        </label>
                        <select
                            name="productId"
                            className="form-control"
                            id="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="videoFile" className="form-label">
                            Video File
                        </label>
                        <input
                            type="file"
                            name="videoFile"
                            className="form-control"
                            id="videoFile"
                            accept="video/*"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {previewUrl && (
                        <div className="col-md-12 mt-3">
                            <label className="form-label">Video Preview</label>
                            <div style={{ aspectRatio: "16/9", width: "50%" }}>
                                <video
                                    width="100%"
                                    height="100%"
                                    controls
                                    src={previewUrl}
                                    title="Video Preview"
                                />
                            </div>
                        </div>
                    )}

                    <div className="col-md-12 mt-4">
                        <button type="submit" className="btn btn-success" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Add Video"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddVideos;
