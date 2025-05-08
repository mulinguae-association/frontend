import { Link } from "react-router-dom";
import "./index.scss";
import React, { Suspense, useState } from 'react';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LazyCourseCard from "./LazyCourseCard";
import SpecificPurposes from "./SpecificPurposes";

const Courses = () => {
  const { t } = useTranslation("courses/generalEnglish");
  const { t: S } = useTranslation("courses/specificPurposes");
  const { t: H } = useTranslation("pages/hundredPhrases");

  const specificPurposeCourses = t("courses.specificPurposeCourses", { returnObjects: true });
  const languages = t("courses.languagesList", { returnObjects: true });
  const englishCourses = t("courses.englishCourses", { returnObjects: true });
  const specificPurposes = S("specificPurposes", { returnObjects: true });
  const isEnglish = i18next.language !== "ar";

  const [collapse, setCollapse] = useState(true)

  const findPairedCardId = (sectionId) => {
    if (window.innerWidth < 1285) {
      return null;
    }

    // For English courses
    const englishIndex = englishCourses.findIndex(course => course.Level === sectionId);
    if (englishIndex !== -1) {
      // If it's an even index, pair with the next card; if odd, pair with the previous card
      const pairedIndex = englishIndex % 2 === 0 ? englishIndex + 1 : englishIndex - 1;
      // Make sure the paired index is valid
      if (pairedIndex >= 0 && pairedIndex < englishCourses.length) {
        return englishCourses[pairedIndex].Level;
      }
    }

    // For specific purpose courses
    const specificIndex = specificPurposes.findIndex(course => course.id === sectionId);
    if (specificIndex !== -1) {
      // If it's an even index, pair with the next card; if odd, pair with the previous card
      const pairedIndex = specificIndex % 2 === 0 ? specificIndex + 1 : specificIndex - 1;
      // Make sure the paired index is valid
      if (pairedIndex >= 0 && pairedIndex < specificPurposes.length) {
        return specificPurposes[pairedIndex].id;
      }
    }

    // If no pair is found, return null
    return null;
  };

  const toggleCollapse = (sectionId) => {
    setCollapse((prevCollapsedSections) => {
      const newState = { ...prevCollapsedSections };
      // Toggle the clicked card
      newState[sectionId] = !prevCollapsedSections[sectionId];

      // Find and toggle the paired card if it exists
      const pairedId = findPairedCardId(sectionId);
      if (pairedId) {
        newState[pairedId] = newState[sectionId];
      }

      return newState;
    });
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
            <div className="courses-hero">
              <div className="hero-content">
                <h1 className="hero-subtitle">{t('courses.sectionTitles.courseCategories')}</h1>
                <p className="hero-description">{t('courses.intro.description')}</p>
              </div>

              <div className="category-grid">
                {/* ESL Card */}
                <div className="category-card esl-card">
                  <div className="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <Link to="#general-english" onClick={() => scrollToSection("generalEnglish-section", 700)}>
                        {t('courses.sectionTitles.esl')}
                      </Link>
                    </h3>
                    <p className="card-description">{t('courses.intro.eslDescription')}</p>
                    <div className="card-action">
                      <Link to="#general-english" className="action-link" onClick={() => scrollToSection("generalEnglish-section", 700)}>
                        {t('courses.common.exploreButton')}
                        <span className="arrow-icon">→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* EFP Card */}
                <div className="category-card efp-card">
                  <div className="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <Link to="#specificPurposes-section" onClick={() => scrollToSection("specificPurposes-section", 700)}>
                        {t('courses.sectionTitles.efp')}
                      </Link>
                    </h3>
                    <p className="card-description">{t('courses.intro.efpDescription')}</p>
                    <div className="course-tags">
                      {specificPurposeCourses.map((course, index) => (
                        <span key={index} className="course-tag" onClick={() => scrollToSection('specificPurposes-section', 1000, 20)}>
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phrases Card */}
                <div className="category-card phrases-card">
                  <div className="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{H("headerTitle")}</h3>
                    <p className="card-description">{t('courses.intro.phrasesDescription')}</p>
                    <div className="language-tags">
                      {languages.map((language) => (
                        <Link key={language.value} to={`/${language.value}/pages/100-basic-phrases/`} className="language-tag">
                          {language.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Other Languages Card */}
                <div className="category-card other-card">
                  <div className="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{t('courses.sectionTitles.languages')}</h3>
                    <p className="card-description">{t('courses.intro.otherLanguagesDescription')}</p>
                    <div className="card-action">
                      <Link to={`/${i18next.language}/contact`} className="action-link contact-action">
                        {t("courses.common.contactUsLink")}
                        <span className="arrow-icon">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id="generalEnglish-section" className="course-section">
            <h2>{t('courses.sectionTitles.esl').slice(2)}</h2>
            <div className="content">
              {englishCourses.map((course) => (
                <Suspense key={course.id} fallback={<div>Loading...</div>}>
                  <LazyCourseCard t={t} course={course} collapse={collapse} toggleCollapse={toggleCollapse} isEnglish={isEnglish} />
                </Suspense>
              ))}
            </div>
          </section>
          <section id="specificPurposes-section" className="course-section">
            <h2>{t('courses.sectionTitles.efp').slice(2)}</h2>
            {
              specificPurposes.map((course) => (
                <Suspense key={course.id} fallback={<div>loading...</div>}>
                  <SpecificPurposes S={S} course={course} collapse={collapse} toggleCollapse={toggleCollapse} isEnglish={isEnglish} />
                </Suspense>
              ))
            }
          </section>
        </div>
      </main >
    </>
  )
}

export default Courses