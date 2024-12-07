import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import SHOP_DATA from '../../data/ShopData'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";


const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const data = SHOP_DATA // Access product data from DataContext
  const dispatch = useDispatch();
  const product = data
    .flatMap((category) => category.items) // Flatten categories to access all products
    .find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="container my-5">
        <h2 className="text-center">Product not found!</h2>
      </div>
    );
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    alert("Added To Cart")
    };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left: Product Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Right: Product Details */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="mb-3">{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-primary mb-4">Price: ₹{product.price}</h4>
          <button className="btn btn-primary btn-md" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
