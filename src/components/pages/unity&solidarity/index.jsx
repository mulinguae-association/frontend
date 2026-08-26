import Card, { CardHeader } from "./Card";
import "./index.scss";
import React, { useState } from "react";
import Tabs from "./Tabs";
import Overview from "./Overview";
import Principles from "./Principles";
import Education from "./Education";
import { IoWarningOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { SEO } from "../../SEO";

export default function UnityAndSolidarity() {
  const { t } = useTranslation("pages/unityAndSolidarity");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeAccordion, setActiveAccordion] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleAccordion = (item) => {
    setActiveAccordion(activeAccordion === item ? null : item);
  };

  return (
    <>
      <SEO
        title="Unity & Solidarity | Mulinguae Community Principles"
        description="Discover the principles of unity and solidarity in the Mulinguae multilingual community. Learn about our values, education, and global collaboration."
        keywords="unity, solidarity, mulinguae, mulingua, community, principles, education, global collaboration"
        path="/pages/unity-solidarity"
      />
      <main className="main_content">
        <div className="container">
          <header>
            <h1 className="title">{t("header.title")}</h1>
          </header>
          <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />

          <div className="tab-panels">
            <div
              role="tabpanel"
              id="panel-overview"
              aria-labelledby="tab-overview"
              hidden={activeTab !== "overview"}
            >
              {activeTab === "overview" && <Overview />}
            </div>

            <div
              role="tabpanel"
              id="panel-principles"
              aria-labelledby="tab-principles"
              hidden={activeTab !== "principles"}
            >
              {activeTab === "principles" && <Principles />}
            </div>

            <div
              role="tabpanel"
              id="panel-education"
              aria-labelledby="tab-education"
              hidden={activeTab !== "education"}
            >
              {activeTab === "education" && (
                <Education
                  activeAccordion={activeAccordion}
                  toggleAccordion={toggleAccordion}
                />
              )}
            </div>
          </div>
          <Card className="card">
            <CardHeader
              title={"When Equality is Absent"}
              icon={IoWarningOutline}
              className={"absent_equality"}
            />
            <p className="warning-text">
              When there is no equality, unity and solidarity are the recourse.
            </p>
          </Card>
        </div>
      </main>
    </>
  );
}
