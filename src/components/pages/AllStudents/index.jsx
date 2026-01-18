import React from 'react'
import "./index.scss";
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaBookReader, FaHandsHelping } from 'react-icons/fa';
import { MdAttachMoney, MdEqualizer } from 'react-icons/md';
const AllStudents = () => {
  const { t } = useTranslation("pages/studentsOfAllAges")
  const categoriesRaw = t("categories", { returnObjects: true });
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : [];
  return (
    <div className='studentsAllAges'>
      <div className='container'>
        <header>
          <h1>{t("title")}</h1>
        </header>

        <section className="intro-section">
          <p>{t("intro")}</p>
        </section>

        <section className="categories-section">
          <h2>
            <FaGraduationCap className="section-icon" />
            {t("categoriesTitle")}
          </h2>
          <ul className="categories">
            {
              categories.map((category, index) =>
                <li key={category}>
                  <span className="category-number">{index + 1}</span>
                  {category}
                </li>
              )
            }
          </ul>
        </section>

        <section className="methods-section">
          <h2>
            <FaBookReader className="section-icon" />
            {t("learningMethodsTitle")}
          </h2>
          <p> {t("learningMethodsText")}</p>
        </section>

        <section className="cost-section">
          <h2>
            <MdAttachMoney className="section-icon" />
            {t("costReductionTitle")}
          </h2>
          <p> {t("costReductionText")}</p>
        </section>

        <section className="equality-section">
          <h2>
            <MdEqualizer className="section-icon" />
            {t("equalityTitle")}
          </h2>
          <p> {t("equalityText")}</p>
        </section>

        <section className="participation-section">
          <h2>
            <FaHandsHelping className="section-icon" />
            {t("participationTitle")}
          </h2>
          <p> {t("participationText")}</p>
        </section>
      </div>
    </div>
  )
}

export default AllStudents