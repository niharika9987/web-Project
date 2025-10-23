import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Product.css";

const products = [
  { id: 1, name: "Red Rose Bouquet", price: 499, category: "Roses", image: "https://i.imgur.com/5b6p4Kw.jpeg", description: "A bouquet of 30 red roses, perfect for expressing love and passion." },
  { id: 2, name: "Tulip Garden Mix", price: 799, category: "Tulips", image: "https://i.imgur.com/lmIccsp.jpeg", description: "A bright and colorful mix of tulips to light up anyone’s day." },
  { id: 3, name: "Sunflower Joy", price: 599, category: "Sunflowers", image: "https://i.imgur.com/kbC2pJz.jpeg", description: "Cheerful sunflowers that bring warmth and positivity." },
  { id: 4, name: "Luxury Orchid Basket", price: 999, category: "Luxury", image: "https://i.imgur.com/xJ9h7ja.jpeg", description: "Elegant orchids arranged in a premium wicker basket." },
  { id: 5, name: "Mixed Love Bunch", price: 699, category: "Mixed Bouquets", image: "https://i.imgur.com/6YzKZ1x.jpeg", description: "A romantic mix of roses, carnations, and daisies." },
];

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Container className="py-5 text-center"><h3>Product not found!</h3></Container>;
  }

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    navigate("/cart");
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="product-img" />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <h4 className="text-danger">₹{product.price}</h4>
          <p>{product.description}</p>
          <Button onClick={handleAddToCart} variant="success">
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
