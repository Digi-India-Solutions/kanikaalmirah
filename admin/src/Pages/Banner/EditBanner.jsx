import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance, { getData, postData, serverURL } from '../../services/FetchNodeServices';
import { fileLimit } from '../../services/fileLimit';

const EditBanner = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        bannerName: '',
        bannerImage: null,
        bannerStatus: false,
        oldImage: '',
    });
    const [previewImage, setPreviewImage] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/banner/get-single-banner/${id}`);
                const banner = response?.data?.banner;

                if (response?.success === 200) {
                    setFormData({
                        bannerStatus: banner?.isActive || false,
                    });
                    setPreviewImage(banner?.bannerImage ? `${banner?.bannerImage}` : '');
                }
            } catch (error) {
                console.error("Failed to fetch banner data:", error);
                toast.error("Failed to load banner data");
            }
        };

        fetchBannerData();
    }, [id]);
    // console.log("bannerssss", previewImage)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            bannerImage: file,
        });
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if(!fileLimit(formData?.bannerImage)) return;
        const submitData = new FormData();
        if (formData?.bannerImage) submitData.append('image', formData?.bannerImage);
        submitData.append('isActive', formData?.bannerStatus ? "true" : "false");

        try {
            setBtnLoading(true);
            const response = await axiosInstance.put(`/api/v1/banner/update-banner/${id}`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response?.status === 200) {
                toast.success("Banner updated successfully");
                navigate('/all-banners'); 
            }
        } catch (error) {
            console.error("Failed to update banner:", error);
            toast.error("Failed to update banner");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Shop Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    {/* <div className="col-md-6">
                        <label htmlFor="bannerName" className="form-label">Banner Name</label>
                        <input
                            type="text"
                            name="bannerName"
                            value={formData?.bannerName}
                            onChange={handleChange}
                            className="form-control"
                            id="bannerName"
                            required                        />
                    </div> */}
                    <div className="col-md-6">
                        <label htmlFor="bannerImage" className="form-label">Banner Image</label>
                        <input
                            type="file"
                            name="bannerImage"
                            className="form-control"
                            id="bannerImage"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="col-md-6">
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Banner Preview"
                                style={{ width: '100px', height: '100px' }}
                            />
                        )}
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="bannerStatus"
                                id="bannerStatus"
                                checked={formData?.bannerStatus}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="bannerStatus">
                                Active
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={btnLoading}
                            className={`btn ${btnLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {btnLoading ? "Please Wait..." : "Update Banner"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
