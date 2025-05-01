import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance, { getData, postData, serverURL } from '../../services/FetchNodeServices';

const AllDieses = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getData('api/v1/category/get-all-categories');
              if(response){
                setCategories(response.categories);
              }
           
            } catch (error) {
                toast.error("Error fetching categories");
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
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
                const data = await axiosInstance.delete(`/api/v1/category/delete-category/${id}`);
                if (data.status === 200) {
                    setCategories(categories.filter(category => category._id !== id));
                    Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
                }
            } catch (error) {
                Swal.fire('Error!', 'There was an error deleting the category.', 'error');
                console.error("Error deleting category:", error);
            }
        }
    };

    // Handle Category Status Change
    const handleCheckboxChange = async (e, categoryId) => {
        const updatedStatus = e.target.checked;
        
        try {
            const response = await axiosInstance.put(`/api/v1/category/update-category/${categoryId}`, {
                showOnHome: updatedStatus
            });

            if (response.status===200) {
                
                const updatedCategories = categories.map(category => {
                    if (category._id === categoryId) {
                        category.showOnHome = updatedStatus;
                    }
                    return category;
                });
                setCategories(updatedCategories);
            }
        } catch (error) {
            toast.error("Error updating category status");
            console.error("Error updating category status:", error);
        }
    };

    // Loading state
    if (isLoading) {
        return <p>Loading categories...</p>;
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Category</h4>
                </div>
                <div className="links">
                    <Link to="/add-category" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            {/* <div className="filteration">
                <div className="head">
                NOTE :- Do add only upto 5 diseases
                </div>
                <div className="search">
                  
                </div>
            </div> */}

            <section className="main-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Show in homepage</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.length > 0 ? (
                            categories?.map((category, index) => (
                                <tr key={category._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category?.categoryName}</td>
                                    <td>
                                        <img src={`${category?.categoryImage}`} alt={category?.categoryName} style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={category?.showOnHome}
                                            onChange={(e) => handleCheckboxChange(e, category._id)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/edit-category/${category?._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(category._id)}>
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default AllDieses;
