import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const handleQuantityChange = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    updateCart(updated);
  };

  const handleCheckout = () => {
    alert("Order placed successfully! 🎉");
    localStorage.removeItem("cart");
    navigate("/");
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>Your cart is empty 🛒</h3>
        <Button onClick={() => navigate("/")}>Go Shopping</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <Table bordered hover responsive className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} className="cart-img" />
                <span className="ms-3">{item.name}</span>
              </td>
              <td>₹{item.price}</td>
              <td>
                <Button
                  variant="light"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </Button>
                <span className="mx-2">{item.qty}</span>
                <Button
                  variant="light"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </Button>
              </td>
              <td>₹{item.price * item.qty}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item.id)}>
                  ✕
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end mt-4">
        <h4>Total: ₹{totalPrice}</h4>
        <Button variant="success" onClick={handleCheckout}>
          Place Order
        </Button>
        <Button variant="success" onClick={() => navigate("/checkout")}>
  Proceed to Checkout
</Button>

      </div>
    </Container>
  );
}
