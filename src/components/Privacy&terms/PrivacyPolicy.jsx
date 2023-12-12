import React from "react";
import TocItems from "./TocItems";
import MainContent from "./MainContent";
import "./index.scss";
import Footer from "../FooterPages";
import ScrollToTop from "../../utils/ScrollToTop";
const PrivacyPolicy = () => {
  ScrollToTop();
  return (
    <>
      <main className="privacy">
        <div className="container">
          <div className="content">
            <TocItems />
            <MainContent />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
