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
                  <Link to="/find-pets">Find Restaurants</Link>
                </li>
                <li>
                  <Link to="/breeds">Knowledge About</Link>
                </li>
                <li>
                  <Link to="/dashboard/your-posts">Manage Your Posts</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>LEARN MORE</h4>
              <ul>
                <li>
                  <Link to="/policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/security">Security</Link>
                </li>
                <li>
                  <Link to="/terms">Terms</Link>
                </li>
                <li>
                  <Link to="/sitemap">Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>About Foodly</h4>
              <ul>
                <li>
                  <Link to="/aboutus">Who we are?</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/workwithus">Work With Us</Link>
                </li>
                <li>
                  <a id="offical-mail" href="mailto:foodly.app18@gmail.com">
                    Mail Us
                  </a>
                </li>
                <li>
                  <Link to="/contactus">Conatct Us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>FOR RESTAURANTS</h4>
              <ul>
                <li>
                  <Link to="/partnerwithus">Partner With Us</Link>
                </li>
                <li>
                  <Link to="/apps">Apps For You</Link>
                </li>
              </ul>
              <br />
              <h4>FOR ENTERPRISES</h4>
              <ul>
                <li>
                  <Link to="/foodlyforenterprise">Foodly For Enterprise</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>SOCIAL LINKS</h4>
              <ul>
                <li>
                  <Link to="/partnerwithus">Partner With Us</Link>
                </li>
                <li>
                  <Link to="/apps">Apps For You</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="col-lg-12 col-sm-12 col-xs-12">
          <p className="copyright">
            Copyright © 2024 <Link to="/terms">Foodly</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
