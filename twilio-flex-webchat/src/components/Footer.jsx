import React from "react";
import fbIcon from "./images/fb-icon.svg";
import twitterIcon from "./images/twitter-icon.svg";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="link-container">
        <div className="column">
          <p className="category">Product</p>
          <a href="https://www.daily.co/hipaa-compliance">HIPAA Compliance</a>
          <a href="https://www.daily.co/security">Security & Compliance</a>
          <a href="https://www.daily.co/pricing">Pricing</a>
        </div>
        <div className="column">
          <p className="category">Resources</p>
          <a href="https://docs.daily.co/docs">Getting Started</a>
          <a href="https://docs.daily.co/docs/reference-docs">Reference docs</a>
          <a href="https://www.daily.co/blog/tag/code-tutorials/">Tutorials</a>
          <a href="https://docs.daily.co/changelog">Changelog</a>
          <a href="https://help.daily.co/en/">Help center</a>
        </div>
        <div className="column">
          <p className="category">Company</p>
          <a href="https://www.daily.co/about-us">About us</a>
          <a href="https://www.daily.co/privacy">Privacy Policy</a>
          <a href="https://www.daily.co/terms-of-service">Terms of Service</a>
          <a href="https://www.daily.co/contact">Contact us</a>
        </div>
      </div>
      <div className="icon-wrapper">
        <p className="sub-text">Built worldwide</p>
        <div className="icon-container">
          <a href="https://twitter.com/trydaily">
            <img className="icon" src={twitterIcon} alt="Daily's Twitter" />
          </a>
          <a href="https://www.facebook.com/dailydotco/">
            <img className="icon" src={fbIcon} alt="Daily's Facebook" />
          </a>
        </div>
      </div>
      <style jsx="true">{`
        .footer-container {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding-top: 6rem;
          padding-right: 2rem;
          padding-left: 2rem;
          margin-top: auto;
          margin-bottom: 1rem;
          width: 100%;
          box-sizing: border-box;
        }
        .link-container {
          display: flex;
          padding-bottom: 3rem;
        }
        .column {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .icon-wrapper {
          display: flex;
          justify-content: flex-start;
        }
        .icon-container {
          display: flex;
          justify-content: flex-end;
        }
        .category {
          font-size: 14px;
          font-weight: bold;
          line-height: 24px;
        }
        .sub-text {
          margin: 0;
          font-size: 14px;
          color: #6b7785;
        }
        a {
          text-decoration: none;
          font-size: 14px;
          color: darkslategrey;
          line-height: 24px;
          margin-bottom: 8px;
          text-decoration: none;
          display: block;
        }
        a:hover {
          text-decoration: underline;
        }
        img.icon {
          margin-left: 0.75rem;
          margin-right: 0.75rem;
        }
        @media (max-width: 500px) {
          .link-container {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
