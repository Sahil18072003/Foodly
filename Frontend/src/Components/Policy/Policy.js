import React, { useEffect } from "react";
import Heading from "./Heading.js";
import "./Policy.css";
import { Link } from "react-router-dom";

const Policy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Foodly";
  }, []);

  return (
    <div>
      <Heading title="Privacy Policy for Foodly" id="pp-title" />
      <div className="mycard">
        <h6>Last updated: 23/02/2023</h6>
        <h6>
          Welcome to Foodly! We are dedicated to safeguarding your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, and protect your data when you
          use our online food delivery and dining platform. By accessing or
          using our platform, you agree to the terms of this Privacy Policy.
        </h6>

        <h6 className="head-point">1. Information We Collect</h6>
        <p>
          a. Personal Information: When you create an account or place an order,
          we may collect personal information such as your name, email address,
          contact details, and payment information.
        </p>
        <p>
          b. Order Details: We collect information about your orders, including
          food preferences, delivery addresses, and order history.
        </p>
        <p>
          c. User Communication: We collect information from your communications
          with us, such as customer support interactions and feedback.
        </p>
        <p>
          d. Usage Data: We automatically collect data on how you interact with
          our platform, including your IP address, browser type, and usage
          patterns.
        </p>

        <h6 className="head-point">2. How We Use Your Information</h6>
        <p>
          We use the information we collect for various purposes, including but
          not limited to:
        </p>
        <p>
          a. Order Processing: To process and deliver your orders and provide
          customer support.
        </p>
        <p>
          b. Personalization: To personalize your experience, provide
          recommendations, and display relevant content and promotions.
        </p>
        <p>
          c. Communication: To communicate with you about your orders,
          promotions, and updates related to our services.
        </p>
        <p>
          d. Security: To protect the security and integrity of our platform,
          transactions, and user accounts.
        </p>
        <p>
          e. Analytics: To analyze and improve our platform's performance,
          functionality, and user experience.
        </p>

        <h6 className="head-point">3. Sharing Your Information</h6>
        <p>
          We respect your privacy and do not share your personal information
          with third parties without your consent, except in the following
          circumstances:
        </p>
        <p>
          a. Service Providers: We may share information with trusted
          third-party service providers who assist us in delivering our
          services.
        </p>
        <p>
          b. Legal Compliance: We may disclose your information when required by
          law, legal process, or government requests.
        </p>

        <h6 className="head-point">4. Chat Functionality</h6>
        <p>
          To protect your personal details, we offer chat functionality that
          allows users to communicate without sharing personal information
          openly. We encourage users to utilize this feature for inquiries and
          discussions on our platform.
        </p>

        <h6 className="head-point">5. Your Choices</h6>
        <p>
          a. Account Information: You can review and update your account
          information at any time by accessing your account settings.
        </p>
        <p>
          b. Communication Preferences: You can manage your communication
          preferences, such as email notifications, in your account settings.
        </p>

        <h6 className="head-point">6. Security</h6>
        <p>
          We employ industry-standard security measures to protect your data.
          However, please be aware that no method of online transmission or
          storage is entirely secure, and we cannot guarantee absolute security.
        </p>

        <h6 className="head-point">7. Changes to this Privacy Policy</h6>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for legal and regulatory reasons. We will notify
          you of any material changes through our platform or other means.
        </p>

        <h6 className="head-point">8. Contact Us</h6>
        <p>
          If you have any questions or concerns about our Privacy Policy or your
          data, please contact us at [contact email or address].
        </p>

        <h6>
          Thank you for choosing Foodly. We are committed to providing you with
          a safe and convenient online food ordering and dining experience.
        </h6>
        <h6>
          Please note that this is a sample privacy policy. Customize it to
          align with your platform's specific practices, legal requirements, and
          applicable laws and regulations. It's advisable to seek legal counsel
          when creating or updating your privacy policy to ensure compliance.
        </h6>
        <Link to="/" id="back">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Policy;
