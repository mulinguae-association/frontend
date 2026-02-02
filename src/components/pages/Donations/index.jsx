import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { Trans, useTranslation } from "react-i18next";
import i18next from "i18next";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Modal from "../../common/Modal";

const PAYPAL_CLIENT_ID =
  import.meta.env.VITE_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID";

const Donation = () => {
  const { t } = useTranslation("pages/donation");
  const [showModal, setShowModal] = useState(false);
  const contributionsRaw = t("contributions.items", { returnObjects: true });
  const contributionsList = Array.isArray(contributionsRaw)
    ? contributionsRaw
    : [];

  return (
    <>
      <div className="donation">
        <div className="container">
          <header>
            <h1>{t("header.title")}</h1>
            <p>
              <Trans
                components={{
                  l: (
                    <button
                      type="button"
                      className="paypal-link-btn"
                      onClick={() => setShowModal(true)}
                    />
                  ),
                  l2: <Link to={"#"} target="_blank" />,
                }}
              >
                {t("header.description")}
              </Trans>
            </p>
            <picture className="wavy-container">
              <img
                width={500}
                height={335}
                src="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/w_600/v1723499391/donate_1000x667_c9o1wl.jpg"
                alt="Donation"
              />
            </picture>
          </header>

          <section className="contributions">
            <h2>{t("contributions.title")}</h2>
            <p>{t("contributions.description1")}</p>
            <p>{t("contributions.description2")}</p>

            <ul className="contributions_list">
              {contributionsList.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
            <p>{t("contributions.description3")}</p>
          </section>

          <section>
            <h2>{t("otherWays.title")}</h2>
            <p>
              <Trans
                components={{
                  l: <Link to={`/${i18next.language}/pages/feedback`} />,
                }}
              >
                {t("otherWays.description")}
              </Trans>
            </p>
            <p>
              <BiHeart color="green" fontSize={18} />
              {t("otherWays.thank_you_note")}
            </p>
          </section>
        </div>
      </div>
      {/* Modal for PayPal donation */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className="paypal-modal"
      >
        <PayPalScriptProvider
          options={{
            "client-id": PAYPAL_CLIENT_ID,
            // components: "buttons",
            currency: "USD",
            intent: "capture",
          }}
        >
          <PayPalButtons
            style={{ label: "donate", layout: "vertical" }}
            createOrder={async (data, actions) => {
              // Call your backend to create the order
              const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: "10.00" }), // Replace with dynamic amount if needed
              });
              const order = await response.json();
              return order.id; // PayPal expects the order ID
            }}
            onApprove={async (data, actions) => {
              // Call your backend to capture the order
              const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              });
              const details = await response.json();
              alert(
                `Thank you for your donation, ${details.payer?.name?.given_name || "Donor"}!`,
              );
              setShowModal(false);
            }}
          />
        </PayPalScriptProvider>
      </Modal>
    </>
  );
};

export default Donation;
