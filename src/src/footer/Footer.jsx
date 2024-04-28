import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  function scrollUp() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className="flex-column align-center">
      <div className="footer">
        <div className="footer-left-section">
          <div className="footer-about">
            <h2>About Us</h2>
            <p>E-commerce website template.</p>
          </div>
          <div className="footer-contact">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <a href="https://github.com/kalamansi10" target="_blank">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jjumadiao/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right-section">
          <div className="footer-links">
            <h2>Quick Links</h2>
            <ul>
              <li onClick={scrollUp}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={scrollUp}>
                <a href="#">Services</a>
              </li>
              <li onClick={scrollUp}>
                <a href="#">Products</a>
              </li>
              <li onClick={scrollUp}>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SeedMart. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
