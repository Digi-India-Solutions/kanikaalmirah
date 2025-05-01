"use client";
import "../ProductList/productlist.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import NoProductsFound from "../../Assets/NoProduct.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByCategory } from "@/redux/slices/productSlice";
import useIsMobile from "@/hooks/useIsMobile";
const CategoryProductList = ({ id }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedFilters, setSelectedFilters] = useState({
    doorType: [],
    colors: [],
    sizes: [],
    materials: [],
  });

  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const { categoryProducts, categoryName, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductByCategory(id));
  }, [id]);
  if (loading);
  if (error) return <p>Error loading products: {error}</p>;

  // Sample product data
  const products = categoryProducts || [];

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.finalPrice >= priceRange[0] &&
      product.finalPrice <= priceRange[1] &&
      (selectedFilters.doorType.length === 0 ||
        selectedFilters.doorType.includes(product.doors.toUpperCase())) &&
      (selectedFilters.colors.length === 0 ||
        selectedFilters.colors.includes(product.colorName)) &&
      (selectedFilters.sizes.length === 0 ||
        selectedFilters.sizes.includes(product.size.toUpperCase())) &&
      (selectedFilters.materials.length === 0 ||
        selectedFilters.materials.includes(product.material))
    );
  });

  return (
    <>
      {loading ? (
        <section className="banner-top-style p-0">
          <div className="container">
            <div className="row">
              <h2 className="heading">Loading Products...</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="banner-top-style p-0">
          <div className="container">
            <div className="row">
              <h2 className="heading">{categoryName}</h2>
            </div>
          </div>
        </section>
      )}

      <div className="products-page">
        {/* Mobile Filter Toggle */}
        <div className="d-lg-none filter-toggle">
          <button
            className="btn btn-dark w-100 mb-3"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-funnel me-2"></i>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="container-fluid">
          <div className="row">
            {/* Filters Sidebar */}
            <div
              className={`col-lg-3 filters-sidebar ${
                showFilters ? "show" : ""
              }`}
            >
              <div className="filters-content">
                <div className="filters-header d-flex justify-content-between align-items-center">
                  <h4>Filters</h4>
                </div>

                {/* Price Range Filter */}
                <div className="filter-section">
                  <h5>Price Range</h5>
                  <div className="price-range">
                    <input
                      type="range"
                      className="form-range"
                      min="300"
                      max="30000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value),
                        ])
                      }
                    />
                    <div className="price-inputs">
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number.parseInt(e.target.value),
                              priceRange[1],
                            ])
                          }
                          disabled={true}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number.parseInt(e.target.value),
                            ])
                          }
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Door Type Filter */}
                <div className="filter-section">
                  <h5>Door Type</h5>
                  {[
                    ...new Set(
                      products.map((product) => product.doors?.toUpperCase())
                    ),
                  ].map(
                    (door) =>
                      door && (
                        <div className="form-check" key={door}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`door-${door}`}
                            checked={selectedFilters.doorType.includes(door)}
                            onChange={() => toggleFilter("doorType", door)}
                          />
                          <label
                            className="form-check-label text-capitalize"
                            htmlFor={`door-${door}`}
                          >
                            {door}
                          </label>
                        </div>
                      )
                  )}
                </div>

                {/* Color Filter */}
                <div className="filter-section">
                  <h5>Color</h5>
                  <div className="color-options">
                    {[
                      ...new Set(
                        products
                          .map((product) => product.colorName)
                          .filter(Boolean)
                      ),
                    ].map((color) => (
                      <div
                        key={color}
                        className={`color-option ${
                          selectedFilters.colors.includes(color)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => toggleFilter("colors", color)}
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="filter-section">
                  <h5>Size</h5>
                  {[
                    ...new Set(
                      products
                        .map((product) => product.size.toUpperCase())
                        .filter(Boolean)
                    ),
                  ].map((size) => (
                    <div className="form-check" key={size}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`size-${size}`}
                        checked={selectedFilters.sizes.includes(size)}
                        onChange={() => toggleFilter("sizes", size)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`size-${size}`}
                      >
                        {size} ft
                      </label>
                    </div>
                  ))}
                </div>

                <div className="filter-section">
                  <h5>Material</h5>
                  {[
                    ...new Set(
                      products
                        .map((product) => product.material)
                        .filter(Boolean)
                    ),
                  ].map((material) => (
                    <div className="form-check" key={material}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`material-${material}`}
                        checked={selectedFilters.materials.includes(material)}
                        onChange={() => toggleFilter("materials", material)}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        htmlFor={`material-${material}`}
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}

            <div className="col-lg-9">
              {/* Sort and Results Info */}
              <div className="products-header">
                <div className="results-info">
                  Showing {filteredProducts.length} results
                </div>
                {/* <div className="sort-options">
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div> */}
              </div>

              {/* Products Grid */}
              <div className="row g-4">
                {products && products.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product._id} className="col-md-4 col-sm-6 col-6">
                      <div className="product-card">
                        <Link href={`/products/${product._id}`}>
                          <div className="product-image">
                            <Image
                              src={product.coverImage || "/placeholder.svg"}
                              alt={product.productName}
                              width={300}
                              height={300}
                              className="img-fluid"
                            />
                          </div>
                        </Link>
                        <div className="product-info">
                          <h3 className="product-title">
                            {isMobile
                              ? product.productName.length > 15
                                ? product.productName
                                    .substring(0, 15)
                                    .toUpperCase() + "..."
                                : product.productName.toUpperCase()
                              : product.productName.toUpperCase()}
                          </h3>

                          <div className="product-meta">
                            <span
                              style={{
                                backgroundColor: product.colorName,
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                              }}
                            ></span>

                            <span className="door-type">
                              {isMobile
                                ? product.colorName.length > 5
                                  ? product.colorName
                                      .substring(0, 5)
                                      .toUpperCase() + "..."
                                  : product.colorName.toUpperCase()
                                : product.colorName.toUpperCase()}
                            </span>

                            <span className="size">
                              {product.material.toUpperCase()} ft
                            </span>
                          </div>

                          <div className="product-meta">
                            <span className="door-type">
                              {isMobile
                                ? product.doors.length > 10
                                  ? product.doors
                                      .substring(0, 10)
                                      .toUpperCase() + "..."
                                  : product.doors.toUpperCase()
                                : product.doors.toUpperCase()}
                            </span>

                            <span className="size">
                              {product.size.toUpperCase()} ft
                            </span>
                          </div>

                          <div className="product-price">
                            <span className="current-price">
                              ₹{product.finalPrice.toLocaleString()}
                            </span>
                            <span className="original-price">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>

                          <div className="product-rating">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`bi bi-star${
                                  i < Math.floor(product.rating)
                                    ? "-fill"
                                    : i < product.rating
                                    ? "-half"
                                    : ""
                                }`}
                              ></i>
                            ))}
                            <span className="rating-value">
                              {product.rating}
                            </span>
                          </div>

                          <div className="Buy-btn w-100">
                            <Link
                              href={`/products/${product._id}`}
                              className="w-100"
                            >
                              <button className="w-100">Buy Now</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Image
                      src={NoProductsFound}
                      alt="No Products Found"
                      className="img-fluid"
                      style={{ width: "200px", marginBottom: "20px" }}
                    />
                    <h3>Oops! No Products Found</h3>

                    <p>
                      It looks like there are no products matching your
                      Category. Try exploring other categories!
                    </p>
                    <Link href="/">
                      <button
                        style={{
                          marginTop: "20px",
                          padding: "10px 20px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Explore Products
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProductList;
