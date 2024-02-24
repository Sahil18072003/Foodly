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
          Welcome to Foodly! At Foodly, we are committed to protecting your
          privacy and ensuring the security of your personal information. This
          Privacy Policy outlines how we collect, use, and safeguard your data
          when you use our website and services. By accessing or using our
          website, you consent to the practices described in this Privacy
          Policy.
        </h6>

        <h6 className="head-point">1. Information We Collect</h6>
        <p>
          a. Personal Information: When you create an account or use our
          services, we may collect personal information such as your name, email
          address, contact information, and other details you provide.
        </p>
        <p>
          b. Pet Information: We may collect information about your pets,
          including their names, breeds, and photos, as it relates to the
          services we provide.
        </p>
        <p>
          c. User Communication: We collect information from your communications
          with us, including emails, chat messages, and customer support
          interactions.
        </p>
        <p>
          d. Usage Data: We automatically collect data on how you interact with
          our website, such as your IP address, browser type, operating system,
          and usage patterns.
        </p>

        <h6 className="head-point">2. How We Use Your Information</h6>
        <p>
          We use the information we collect for various purposes, including but
          not limited to:
        </p>
        <p>
          a. Providing Services: To facilitate buying, selling, and breeding
          pets, and to enhance your overall experience on our platform.
        </p>
        <p>
          b. Personalization: To personalize your experience, provide tailored
          recommendations, and display relevant content and advertisements.
        </p>
        <p>
          c. Communication: To communicate with you about your account,
          transactions, and updates related to our services.
        </p>
        <p>
          d. Security: To protect the security and integrity of our platform and
          user accounts.
        </p>
        <p>
          e. Analytics: To analyze and improve our website's performance,
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
          third-party service providers who assist us in operating our website
          and delivering services to you.
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
          you of any material changes through our website or other means.
        </p>

        <h6 className="head-point">8. Contact Us</h6>
        <p>
          If you have any questions or concerns about our Privacy Policy or your
          data, please contact us at [contact email or address].
        </p>

        <h6>
          Thank you for choosing Foodly. We are dedicated to providing you with
          a safe and enjoyable pet ownership experience.
        </h6>
        <h6>
          Please note that this is a sample privacy policy, and you should
          customize it to align with your platform's specific practices, legal
          requirements, and any applicable laws and regulations. It's advisable
          to seek legal counsel when creating or updating your privacy policy to
          ensure compliance with relevant privacy laws.
        </h6>
        <Link to="/" id="back">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Policy;
