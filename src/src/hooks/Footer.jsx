import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {

  function scrollUp() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });    
  }

  return (
    <footer>
      <div class='footer-content flex-row'>
        <div class='footer-section about'>
          <h2>About Us</h2>
          <p>E-commerce website template.</p>
        </div>
        <div class='footer-section contact'>
          <h2>Contact Us</h2>
          <p><a href='https://github.com/kalamansi10' target='_blank'>GitHub</a></p>
          <p><a href='https://www.linkedin.com/in/jjumadiao/' target='_blank'>LinkedIn</a></p>
        </div>
        <div class='footer-section links'>
          <h2>Quick Links</h2>
          <ul>
            <li onClick={scrollUp}><Link to='/'>Home</Link></li>
            <li onClick={scrollUp}><a href='#'>Services</a></li>
            <li onClick={scrollUp}><a href='#'>Products</a></li>
            <li onClick={scrollUp}><a href='#'>Contact</a></li>
          </ul>
        </div>
      </div>
      <div class='footer-bottom'>
        <p>&copy; 2024 SeedMart. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
