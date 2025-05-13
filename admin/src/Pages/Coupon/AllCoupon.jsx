import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance, { getData, postData } from '../../services/FetchNodeServices';

const AllCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/coupon/get-all-coupons');
                if (response.status === 200) {
                    setCoupons(response?.data?.coupons);
                }
            } catch (error) {
                toast.error('Error fetching coupons');
                console.error('Error fetching coupons:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    // Handle Delete Action
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axiosInstance.delete(`/api/v1/coupon/delete-coupon/${id}`);
                if (response.success === true) {
                    setCoupons(coupons?.filter(coupon => coupon?._id !== id));
                    Swal.fire('Deleted!', 'Your coupon has been deleted.', 'success');
                }
            } catch (error) {
                Swal.fire('Error!', 'There was an error deleting the coupon.', 'error');
                console.error('Error deleting coupon:', error);
            }
        }
    };

    // Handle status checkbox change
    const handleCheckboxChange = async (e, couponId) => {
        const updatedStatus = e.target.checked;

        try {
            const response = await axiosInstance.put(`/api/v1/coupon/update-coupon/${couponId}`, {
                isActive: updatedStatus,
            });

            if (response.status===200) {
                
                const updatedCoupons = coupons.map(coupon => {
                    if (coupon._id === couponId) {
                        coupon.isActive = updatedStatus;
                    }
                    return coupon;
                });
                toast.success('Coupon status updated successfully');
                setCoupons(updatedCoupons); 
            }
        } catch (error) {
            toast.error("Error updating coupon status");
            console.error("Error updating coupon status:", error);
        }
    };

    // Loading state
    if (isLoading) {
        return <p>Loading Coupons...</p>;
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Coupons</h4>
                </div>
                <div className="links">
                    <Link to="/add-coupon" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            {/* <div className="filteration">
                <div className="selects">
                  
                </div>
                <div className="search">
                    <label htmlFor="search">Search</label>&nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        onChange={(e) => {
                            // Implement search filtering logic here if necessary
                        }}
                    />
                </div>
            </div> */}

            <section className="main-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Coupon Title</th>
                            <th scope="col">Coupon Code</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Show Top in Home Page</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.length > 0 ? (
                            coupons.map((coupon, index) => (
                                <tr key={coupon._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{coupon?.title || "-"}</td>
                                    <td>{coupon?.couponCode}</td>
                                    <td>{coupon.discount}{coupon?.discount > 100 ? "₹":"%"}</td>

                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={coupon?.isActive}
                                            onChange={(e) => handleCheckboxChange(e, coupon._id)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/edit-coupon/${coupon?._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(coupon?._id)}>
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No Coupons found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllCoupon;
