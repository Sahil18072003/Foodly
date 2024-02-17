import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <div className="single_footer">
              <h4>Services</h4>

              <ul>
                <li>
                  <Link to="/find-pets">Find Pets</Link>
                </li>
                <li>
                  <Link to="/breeds">Knowledge About Breeds</Link>
                </li>
                <li>
                  <Link to="/dashboard/your-posts">Manage Your Posts</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Page Link</h4>

              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>PawsomeLife</h4>
              <ul>
                <li>
                  <a
                    id="offical-mail"
                    href="mailto:pawsomlife.official.2023@gmail.com"
                  >
                    {/* pawsomelife.official.2023@gmail.com */}
                    Mail Us
                  </a>
                </li>
                <li>
                  <Link to="/about-us">Who we are?</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-12 col-xs-12">
            <p className="copyright">
              Copyright © 2023 <Link to="/terms">PawsomeLife</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
