import React from "react";
import { Container } from "react-bootstrap";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero-section">
      <Container>
        <h1 className="hero-title">Delivering Smiles, One Bouquet at a Time 💐</h1>
        <p className="hero-subtitle">
          Discover handcrafted bouquets for every occasion — love, joy, and celebrations.
        </p>
        <button className="hero-btn">Shop Now</button>
      </Container>
    </div>
  );
}
