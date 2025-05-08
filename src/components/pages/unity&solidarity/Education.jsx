import React from "react";
import Card, { CardBody, CardHeader } from "./Card";
import { FiBookOpen } from "react-icons/fi";
import { MdBalance } from "react-icons/md";
import Accordion from "./Accordion";
import { PiGraduationCap } from "react-icons/pi";
import styles from "./Education.module.scss";
import { useTranslation } from "react-i18next";

export default function Education({ activeAccordion, toggleAccordion }) {
  const { t } = useTranslation("pages/unityAndSolidarity");

  const accordionItems = [
    {
      id: "item-1",
      title: t("education.equity.accordion.item1.title"),
      content: t("education.equity.accordion.item1.content"),
    },
    {
      id: "item-2",
      title: t("education.equity.accordion.item2.title"),
      content: t("education.equity.accordion.item2.content"),
    },
  ];

  return (
    <>
      <Card className={styles.card_no_padding}>
        <CardHeader
          title={t("education.project.title")}
          icon={FiBookOpen}
          subtitle={t("education.project.subtitle")}
        />
        <CardBody className={styles.educationProjectGoal}>
          <section>
            <h3 className={styles.card_heading}>
              {t("education.project.goals.title")}
            </h3>
            <p>{t("education.project.goals.description")}</p>
          </section>
          <section>
            <h3 className={styles.card_heading}>
              {t("education.project.approach.title")}
            </h3>
            <p>{t("education.project.approach.description")}</p>
          </section>
        </CardBody>
      </Card>
      <Card className={styles.card}>
        <CardHeader
          title={t("education.declaration.title")}
          subtitle={t("education.declaration.subtitle")}
          icon={MdBalance}
          className={styles.card_header}
        />
        <blockquote className={styles.quote}>
          {t("education.declaration.quote")}
        </blockquote>
      </Card>
      <Card className={styles.card}>
        <CardHeader
          title={t("education.equity.title")}
          subtitle={t("education.equity.subtitle")}
          icon={PiGraduationCap}
          className={styles.card_header}
        />
        <CardBody>
          <Accordion
            items={accordionItems}
            activeAccordion={activeAccordion}
            toggleAccordion={toggleAccordion}
          />
        </CardBody>
      </Card>
    </>
  );
}
