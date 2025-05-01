"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./productdetail.css";
import Link from "next/link";
import { fetchProductDetails } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchCategoryDetails } from "@/redux/slices/categorySlice";
import { addToCart, AddToCartToServer } from "@/redux/slices/cartSlice";
import { color } from "framer-motion";
import { toast } from "react-toastify";
const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
const {user}=useSelector((state)=>state.auth)
  const { selectedCategory } = useSelector((state) => state.category);

  const { id } = useParams();

  const handleAddToCart = () => {
    if(quantity > selectedProduct.stock){
      toast.error("Out of stock");
      return;
    }
  if(user?.email){
    dispatch(AddToCartToServer({productId:selectedProduct._id,quantity}))
    toast.success("Product added to cart",{
      position: "bottom-right",
    });
  }else{
    dispatch(addToCart({ productId: selectedProduct._id, quantity,image:selectedProduct.coverImage,price:selectedProduct.price * (selectedProduct.discount / 100),name:selectedProduct.productName,color:selectedProduct.colorName,size:selectedProduct.size,stock:selectedProduct.stock }));
    toast.success("Product added to cart",{
      position: "bottom-right",
    });
  }
   
  };
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.category) {
      dispatch(fetchCategoryDetails(selectedProduct.category));
    }
  }, [dispatch, selectedProduct?.category]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;
  let images = [];
  images.push(selectedProduct?.coverImage || "./placeholder.svg");
  if (selectedProduct?.images) {
    images.push(...(selectedProduct.images || "./placeholder.svg"));
  }

  let relatedProducts;
  if (selectedProduct?.category && selectedCategory) {
    relatedProducts = selectedCategory
      .filter((product) => product._id !== selectedProduct._id)
      .slice(0, 4);
  }

  return (
    <>
      <section>
        <div className="container mb-5">
          <div className="row">
            {/* Product Images */}
            <div className="col-lg-6">
              <div className="product-gallery">
                <div className="main-image-container mb-3">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt="Product"
                    width={600}
                    height={600}
                    className="main-image"
                  />
                </div>
                <div className="thumbnail-container">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ₹{
                        selectedImage === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="product-info">
                <div className="d-flex justify-content-between align-items-start">
                  <h1 className="product-title">
                    {selectedProduct?.productName}
                  </h1>
                  <div className="product-actions">
                    <button className="btn btn-link">
                      <i className="bi bi-share icon"></i>
                    </button>
                  </div>
                </div>

                <div className="product-rating mb-3">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star star-icon filled"></i>
                    ))}
                  </div>
                </div>

                <div className="product-price mb-4">
                  <span className="current-price">
                    <i className="bi bi-currency-rupee"></i>
                    {selectedProduct?.finalPrice.toLocaleString()}
                  </span>
                  <span className="original-price">
                    <i className="bi bi-currency-rupee"></i>
                    {selectedProduct?.price}
                  </span>
                  <span className="discount-badge">
                    {" "}
                    {selectedProduct?.discount}% OFF
                  </span>
                </div>

                <div
                  className="product-description mb-4"
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct?.description,
                  }}
                ></div>

                {/* New Info Section */}
                <div className="product-specs mb-4">
                  <ul className="list-unstyled row">
                    <li className="col-md-6 mb-2">
                      <strong>Color:</strong>{" "}
                      <span
                        style={{
                          backgroundColor: selectedProduct?.colorName,
                          width: "20px",
                          height: "20px",
                          display: "inline-block",
                          borderRadius: "50%",
                        }}
                      ></span>{" "}
                      {selectedProduct?.colorName}
                    </li>
                    <li className="col-md-6 mb-2">
                      <strong>Material:</strong> {selectedProduct?.material}
                    </li>
                    <li className="col-md-6 mb-2">
                      <strong>Door Type:</strong> {selectedProduct?.doors}
                    </li>
                    <li className="col-md-6 mb-2">
                      <strong>Size:</strong> {selectedProduct?.size}
                    </li>
                    <li className="col-md-6 mb-2">
                      <strong>Stock Status:</strong>{" "}
                      {selectedProduct?.stock > 0 ? (
                        <span className="text-success">
                          In Stock - {selectedProduct?.stock}
                        </span>
                      ) : (
                        <span className="text-danger">Out of Stock</span>
                      )}
                    </li>
                  </ul>
                </div>

                <div className="quantity-selector mb-4">
                  <h6>Quantity</h6>
                  <div className="quantity-controls">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="bi bi-dash-lg icon-sm"></i>
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bi bi-plus-lg icon-sm"></i>
                    </button>
                  </div>
                </div>

                <div className="Buy-btn mb-2">
                  <Link href="/checkout" className="w-100 text-white">
                    <button className="btn w-100">Buy Now</button>
                  </Link>
                </div>
                <div className="Buy-btn mb-2">
                  <button className="btn w-100" onClick={handleAddToCart}>Add to Cart </button>
                </div>

                <div className="shipping-info">
                  {/* <div className="shipping-item">
                    <i className="bi bi-truck icon"></i>
                    <div>
                      <h6>Free Shipping</h6>
                      <p>
                        On orders over <i className="bi bi-currency-rupee"></i>
                        4999
                      </p>
                    </div>
                  </div> */}
                  <p className="mt-1">
                    <span className="text-danger fw-bold">Note:</span>{" "}
                    Dealership members can connect with us through this link:
                    <Link href="/contact"> Get in touch</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {
          relatedProducts && relatedProducts.length > 0 && (
            <div className="container mb-5">
            <h3 className="section-title">You May Also Like</h3>
            <div className="row">
              {relatedProducts?.map((product, index) => (
                <div key={index} className="col-md-3 col-sm-4 col-6">
                  <div className="related-product">
                    <Image
                      src={product?.coverImage || "/placeholder.svg"}
                      alt={product?.productName}
                      width={250}
                      height={250}
                      className="related-product-image img-fluid"
                    />
  
                    <div className="product-info">
                      <h3 className="product-title">{product?.productName}</h3>
                      <div className="product-meta">
                        <span className="door-type">{product?.doors} Door</span>
                        <span className="size">{product?.size} ft</span>
                      </div>
                      <div className="product-price">
                        <span className="current-price">
                          ₹
                          {product?.price &&
                            product.price *
                              (1 - product.discount / 100)?.toLocaleString()}
                        </span>
                        <span className="original-price">
                          ₹{product?.price?.toLocaleString()}
                        </span>
                      </div>
  
                      <div className="Buy-btn w-100">
                        <Link href={`/products/${product._id}`} className="w-100">
                          <button className="w-100">Buy Now</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )
        }
      
      </section>
    </>
  );
};

export default Product;
