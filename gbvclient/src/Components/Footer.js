import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className="footer-section">
          <h3>About</h3>
          <p>
            At HAKISHA we offer the best services for the victims of vioations fell free to reach us in case you need any help.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className='footer-ul'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Report">Report</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
           
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            123 Main Street<br />
            City, State 12345<br />
            Phone: (254) 790479167<br />
            Email: hakishagbvsystem@gmail.com
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HAKISHA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;