import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cod",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length === 0) navigate("/cart");
    setCart(storedCart);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields!");
      return;
    }

    alert(
      `🎉 Order placed successfully!\n\nThank you, ${form.name}!\nYour total: ₹${total}`
    );
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <Row>
        <Col md={7}>
          <Card className="p-4 checkout-card mb-4">
            <h4 className="mb-3">Shipping Details</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  placeholder="Enter your full address"
                  value={form.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="p-4 checkout-card">
            <h4 className="mb-3">Order Summary</h4>
            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <hr />
            <h5 className="d-flex justify-content-between">
              <span>Total:</span>
              <span>₹{total}</span>
            </h5>
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
