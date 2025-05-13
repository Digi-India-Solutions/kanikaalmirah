import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance, { getData, postData, serverURL } from '../../services/FetchNodeServices';
import { Parser } from 'html-to-react';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getData(`api/v1/product/get-all-products`);
               if(response){
                setProducts(response.products);
               }
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to fetch products!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleDelete = async (productId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            try {
                const data = await axiosInstance.delete(`/api/v1/product/delete-product/${productId}`);
                if (data.success) {
                    setProducts(products.filter(product => product._id !== productId));
                    toast.success("Product deleted successfully!");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product!");
            }
        }
    };

    const handleTypeChange = async (e, productId) => {
        const Type = e.target.value;

        try {
            const response = await postData('api/product/change-type', {
                productId,
                type: Type,
            });

            if (response.success) {
                const updatedProducts = products.map(product =>
                    product._id === productId ? { ...product, type: Type } : product
                );
                setProducts(updatedProducts);
                toast.success('Product Type status updated successfully');
            }
        } catch (error) {
            console.error("Error updating category status:", error);
            toast.error("Error updating category status");
        }
    };

    const handleCheckboxChange = async (e, productId) => {
        const updatedStatus = e.target.checked;

        try {
            const response = await postData('api/product/change-status', {
                productId,
                status: updatedStatus
            });

            if (response.success) {
                const updatedProducts = products.map(product =>
                    product._id === productId ? { ...product, status: updatedStatus } : product
                );
                setProducts(updatedProducts);
                toast.success('Product status updated successfully');
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Error updating product status");
        }
    };
    const handleCheckboxActiveChange = async (e, productId) => {
        const updatedStatus = e.target.checked;

        try {
            const response = await axiosInstance.put(`/api/v1/product/update-product/${productId}`, {
                isFeaturedProduct: updatedStatus.toString()
            });

            if (response.status===200) {
                const updatedProducts = products.map(product =>
                    product._id === productId ? { ...product, isFeaturedProduct: updatedStatus } : product
                );
                setProducts(updatedProducts);
                toast.success('Product Status updated successfully');
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Error updating product status");
        }
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const typeOptions = [
        { _id: 'new', type: 'New Arrival' },
        { _id: 'featured', type: 'Featured Product' },
        { _id: 'best', type: 'Best Seller' }
    ];

    return (
        <>
            <ToastContainer />

            <div className="bread">
                <div className="head">
                    <h4>All Product List</h4>
                </div>
                <div className="links">
                    <Link to="/add-product" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <section className="main-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Product Image</th>
                            <th>Product Description</th>
                            <th>Show on feature product</th>
                            {/* <th>In Stock</th> */}
                            {/* <th>Type</th> */}
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Discount</th>
                            <th>Final Price</th>
                            {/* <th>Tax</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="11" className="text-center">Loading...</td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="11" className="text-center">No products found.</td>
                            </tr>
                        ) : (
                            products?.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product?.category?.categoryName}</td>
                                    <td>
                                       <img src={product?.coverImage}/>
                                    </td>
                                    <td>{Parser().parse(product?.description?.slice(0,25))}...</td>
                                    {/* <td>
                                        <input
                                            type="checkbox"
                                            checked={product?.status}
                                            onChange={(e) => handleCheckboxChange(e, product._id)}
                                        />
                                    </td> */}
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={product?.isFeaturedProduct}
                                            onChange={(e) => handleCheckboxActiveChange(e, product?._id)}
                                        />
                                    </td>
                                    {/* <td>
                                       
                                        {product?.type?.map((t) => <div>{t} ,</div>)}
                                    </td> */}
                                    <td>{product?.colorName}</td>
                                    <td>{product?.size}</td>
                                    <td>{product?.price}</td>
                                    <td>{product?.stock}</td>
                                    <td>{product?.discount}{product?.discount > 100 ? " ₹" : "%"}</td>
                                    <td>{product?.finalPrice?.toFixed(0)}</td>
                                    {/* <td>{product?.Variant?.map((v, i) => <div key={i}>{v?.tax}</div>)}</td> */}
                                    <td>
                                        <Link to={`/edit-product/${product._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        &nbsp;
                                        <button onClick={() => handleDelete(product._id)} className="bt delete">
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllProduct;