import { Link } from "react-router-dom"
import "./index.scss"
import React, { useState } from 'react'
import { FaArrowDown, FaArrowUp, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Footer from "../FooterPages";

const Courses = () => {
  const { t } = useTranslation("courses/generalEnglish");
  const { t: S } = useTranslation("courses/specificPurposes");
  const { t: H } = useTranslation("pages/hundredPhrases");

  const specificPurposeCourses = t("courses.specificPurposeCourses", { returnObjects: true });
  const languages = t("courses.languagesList", { returnObjects: true });
  const englishCourses = t("courses.englishCourses", { returnObjects: true });
  const specificPurposes = S("specificPurposes", { returnObjects: true });
  const isEnglish = i18next.language !== "Ar"

  const [collapse, setCollapse] = useState({});

  const toggleCollapse = (sectionId) => {
    setCollapse((prevCollapsedSections) => ({
      ...prevCollapsedSections,
      [sectionId]: !prevCollapsedSections[sectionId]
    }))
  }


  // scroll to specific section function with specific time
  function scrollToSection(sectionId, duration = 500, offsetTop = 0) {
    const section = document.getElementById(sectionId);
    if (section) {
      const startingY = window.scrollY;
      const targetY = section.getBoundingClientRect().top + window.scrollY - offsetTop;
      const startTime = performance.now();

      function scroll() {
        const currentTime = performance.now() - startTime;
        if (currentTime < duration) {
          const progress = currentTime / duration;
          window.scrollTo(0, startingY + (targetY - startingY) * progress);
          requestAnimationFrame(scroll);
        } else {
          window.scrollTo(0, targetY);
        }
      }
      requestAnimationFrame(scroll);
    }
  }


  return (
    <>
      <main className="courses">
        <div className="container">
          <div className="content">
            <h1>{t('courses.heading')}</h1>
            <h2>{t('courses.subHeading')}</h2>
            <div className="parent">
              <div >
                <section id="esl">
                  <h3>
                    <Link to="#general-english"
                      onClick={() => scrollToSection("generalEnglish-section", 700)}>
                      {t('courses.sectionTitles.esl')}
                    </Link>
                  </h3>
                </section>
                <section id="efp">
                  <h3>{t('courses.sectionTitles.efp')}</h3>
                  <ul className="course-list">
                    {specificPurposeCourses.map((course, index) => (
                      <li key={index}>
                        <Link to={`#${course.toLowerCase().replace(/\s/g, '-')}`}
                          onClick={() => scrollToSection(`${course.toLowerCase().replace(/\s/g, '-')}`, 1000, 20)}>
                          {course}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="languages">
                  {<h3>{H("headerTitle")}</h3>}
                  <ul className="langauges-list">
                    {languages.map((language) => (
                      <li className={`lang-${language.label}`} key={language.value}>
                        <Link to={`/${language.value}/pages/100-basic-phrases/`}>{language.label}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
                <h3>{t('courses.sectionTitles.languages',)}
                  <Link to={`/${i18next.language}/contact`}> ({t("courses.common.contactUsLink")})</Link>
                </h3>
              </div>
              <img
                src="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/v1706727876/courses_okcsgp.jpg"
                sizes="(min-width: 750px) 30vw, 100vw"
                loading="lazy"
                width="450"
                height="286"
                alt="coursesImage"
              />
            </div>
          </div>
          <section id="generalEnglish-section" className="course-section">
            <h2>{t('courses.sectionTitles.esl').slice(2)}</h2>
            <div className="content">
              {englishCourses.map((course) => (
                <div className={`course-details ${collapse[course.Level] ? "collapse" : ""}`} key={course.id}>
                  <h2 style={collapse[course.Level] ? { height: "30px", display: "flex", alignItems: "center" } : {}}>{course.CourseName} {
                    `${collapse[course.Level]
                      && +course.id !== 1
                      && isEnglish ? (course.Level.slice(0, 8))
                      : collapse[course.Level] && +course.id !== 1 ?
                        course.Level.slice(0, 10) : ''}`}
                  </h2>
                  <span className="collapseBtn" onClick={() => toggleCollapse(course.Level)}>
                    {collapse[course.Level] ? <FaArrowDown /> : <FaArrowUp />}
                  </span>
                  <p><strong>{t("courses.englishCoursesTitle.Level")}</strong> {course.Level}</p>
                  <p><strong>{t("courses.englishCoursesTitle.Duration")}</strong> {course.Duration}</p>
                  <p><strong>{t("courses.englishCoursesTitle.RecommendedFeeForTeacher")}</strong> {course.RecommendedFeeForTeacher}</p>
                  <p><strong>{t("courses.englishCoursesTitle.Description")}</strong> {course.Description}</p>
                  <h3>{t("courses.englishCoursesTitle.LearningOutcomes")}</h3>
                  <ul className="outcome-list">
                    {course.LearningOutcomes.map((outcome, outcomeIndex) => (
                      <li key={outcomeIndex}><FaStar size={15} color="darkgreen" /> {outcome}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <section id="speceficPurposes-section" className="course-section">
            <h2>{t('courses.sectionTitles.efp').slice(2)}</h2>
            {
              specificPurposes.map((course, index) => (
                <div id={course.id} className={`course-details ${collapse[course.id] ? "collapse" : ""}`} key={index}>
                  <h2 style={collapse[course.id] ? { height: "30px", display: "flex", alignItems: "center" } : {}}>{course.name}</h2>
                  <span className="collapseBtn" onClick={() => toggleCollapse(course.id)}>
                    {collapse[course.id] ? <FaArrowDown /> : <FaArrowUp />}
                  </span>
                  <p><strong>{S("specificPurposesTitle.duration")}</strong> {course.duration}</p>
                  <p><strong>{S("specificPurposesTitle.recommendedFeeForTeacher")}</strong> {course.recommendedFeeRange}</p>
                  <p><strong>{S("specificPurposesTitle.targetAudience")}</strong> {course.targetAudience}</p>
                  <p><strong>{S("specificPurposesTitle.description")}</strong> {course.description}</p>
                  <p><strong>{S("specificPurposesTitle.goals")}</strong></p>
                  <ul style={isEnglish ? { marginRight: 0 } : { marginRight: "40px" }}>
                    {course.goals.map((goal, goalIndex) => (
                      <li className={isEnglish ? "" : "right"} key={goalIndex}>{goal}</li>
                    ))}
                  </ul>
                  <p><strong>{S("specificPurposesTitle.methodology")}</strong> {course.methodology}</p>
                  <p><strong>{S("specificPurposesTitle.areasCovered")}</strong> {course.areasCovered}</p>
                  <p><strong>{S("specificPurposesTitle.requiredLevel")}</strong> {course.requiredLevel}</p>
                </div>
              ))
            }
          </section>
        </div>
      </main >
      <Footer />
    </>
  )
}

export default Courses