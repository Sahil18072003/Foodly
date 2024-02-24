import React, { useEffect } from "react";
import Heading from "./Heading.js";
import "./Policy.css";
import { Link } from "react-router-dom";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Condition | Foodly";
  }, []);

  return (
    <div>
      <Heading title="Terms & Conditions of Foodly" id="tc-title" />
      <div className="mycard">
        <h6>Last updated: 23/02/2024</h6>
        <h6>
          Welcome to Foodly! These Terms and Conditions of Use ("Terms") govern
          your access to and use of the Foodly website and services
          ("Platform"). Please read these Terms carefully before using our
          services. By accessing or using our Platform, you agree to comply with
          and be bound by these Terms. If you do not agree with these Terms,
          please do not use our services.
        </h6>

        <h6 className="head-point">1. Definitions</h6>
        <p>
          a. User: Any individual or entity accessing or using the Foodly
          Platform.
        </p>
        <p>
          b. User Account: A registered account on the Platform, allowing users
          to access and use certain features
        </p>
        <h6 className="head-point">2. Eligibility</h6>
        <p>
          You must be at least 13 years old to use our services. By using our
          Platform, you represent and warrant that you meet this eligibility
          requirement.
        </p>

        <h6 className="head-point">3. User Accounts</h6>
        <p>
          a. Account Registration: To access certain features of Foodly, you may
          need to create a user account. You are responsible for providing
          accurate and up-to-date information during registration.
        </p>
        <p>
          b. Account Security: You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account. Notify us immediately if you suspect
          unauthorized access to your account.
        </p>

        <h6 className="head-point">4. Privacy</h6>
        <p>
          Please review our{" "}
          <Link to="/policy" style={{ color: "var(--dark-brown-text);" }}>
            Privacy Policy
          </Link>{" "}
          to understand how we collect, use, and protect your personal
          information.
        </p>

        <h6 className="head-point">5. User Content</h6>
        <p>
          a. Ownership: By posting, submitting, or sharing content on our
          platform, you grant us a non-exclusive, worldwide, royalty-free
          license to use, reproduce, and distribute that content.
        </p>
        <p>
          b. Prohibited Content: You may not post or share content that violates
          these Terms, infringes on intellectual property rights, is harmful,
          defamatory, or illegal.
        </p>

        <h6 className="head-point">6. Prohibited Activities</h6>
        <p>You agree not to:</p>
        <p>a. Use our platform for any unlawful or fraudulent purposes.</p>
        <p>b. Impersonate another person or entity.</p>
        <p>c. Engage in harassment, spamming, or any abusive behavior.</p>
        <p>
          d. Attempt to disrupt or interfere with our platform's functionality.
        </p>

        <h6 className="head-point">7. Intellectual Property</h6>
        <p>
          a. Ownership: All content on our platform, including text, graphics,
          logos, and software, is protected by intellectual property laws. You
          may not use our content without our express permission.
        </p>
        <p>
          b. Trademarks: Any trademarks or service marks on our platform are the
          property of Foodly and may not be used without our permission.
        </p>

        <h6 className="head-point">8. Dispute Resolution</h6>
        <p>
          a. Mediation and Arbitration: Any disputes arising from your use of
          our platform will be resolved through mediation or arbitration, as
          outlined in our Privacy Policy.
        </p>
        <p>
          b. Choice of Law and Jurisdiction: These Terms are governed by and
          interpreted in accordance with the laws of [Jurisdiction]. Any legal
          action or proceeding relating to these Terms shall be filed in the
          appropriate court in [Jurisdiction].
        </p>

        <h6 className="head-point">9. Modifications</h6>
        <p>
          We may update these Terms from time to time. Any changes will be
          effective immediately upon posting. Your continued use of our platform
          after such changes constitutes acceptance of the modified Terms.
        </p>

        <h6 className="head-point">10. Termination</h6>
        <p>
          We reserve the right to terminate or suspend your account or access to
          our platform for violations of these Terms or for any other reason.
        </p>

        <h6 className="head-point">11. Contact Us</h6>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at [contact email or address].
        </p>

        <h6>
          Thank you for using Foodly. We hope you have a pawsitively wonderful
          experience!
        </h6>

        <Link to="/" id="back">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Terms;
