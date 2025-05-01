import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../services/FetchNodeServices";

const EditVideo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ videoFile: null, productId: "" });
    const [previewUrl, setPreviewUrl] = useState("");
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("api/v1/product/get-all-products");
                if (response.status === 200) {
                    setProducts(response.data?.products);
                }
            } catch (error) {
                toast.error("Failed to fetch products");
            }
        };

        // Fetch existing video details
        const fetchVideo = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/video/get-video/${id}`);
                if (response.status === 200) {
                    const { productId, videoUrl } = response.data?.video;
                    setFormData((prev) => ({ ...prev, productId:productId?._id }));
                    setPreviewUrl(videoUrl);
                } else {
                    toast.error("Failed to load video details");
                }
            } catch (error) {
                toast.error("Error loading video");
            }
        };

        fetchProducts();
        fetchVideo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "videoFile") {
            const file = files[0];
            setFormData((prevData) => ({ ...prevData, videoFile: file }));
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.productId) {
            toast.error("Please select a product");
            setIsLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("productId", formData.productId);
        if (formData.videoFile) {
            formDataToSend.append("video", formData.videoFile);
        }

        try {
            const response = await axiosInstance.put(
                `/api/v1/video/update-video/${id}`,
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
console.log("response",response);

            if (response.status === 200) {
                toast.success(response.data?.message || "Video updated successfully");
                navigate("/all-videos");
            } else {
                toast.error(response.data?.message || "Failed to update video");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Server error while updating video");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Video</h4>
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
                        <label htmlFor="productId" className="form-label">Select Product</label>
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
                        <label htmlFor="videoFile" className="form-label">Change Video (optional)</label>
                        <input
                            type="file"
                            name="videoFile"
                            className="form-control"
                            id="videoFile"
                            accept="video/*"
                            onChange={handleChange}
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
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Video"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditVideo;
