import "./index.scss";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LazyCourseCard from "./LazyCourseCard";
import SpecificPurposes from "./SpecificPurposes";
import CategoryCard from "./CategoryCard";
import CourseTags from "./CourseTags";
import LanguageTags from "./LanguageTags";
import CourseSection from "./CourseSection";

const Courses = () => {
  const { t } = useTranslation("courses/generalEnglish");
  const { t: S } = useTranslation("courses/specificPurposes");
  const { t: H } = useTranslation("pages/hundredPhrases");

  const specificPurposeCoursesRaw = t("courses.specificPurposeCourses", {
    returnObjects: true,
  });
  const specificPurposeCourses = Array.isArray(specificPurposeCoursesRaw)
    ? specificPurposeCoursesRaw
    : [];
  const languagesRaw = t("courses.languagesList", { returnObjects: true });
  const languages = Array.isArray(languagesRaw) ? languagesRaw : [];
  const englishCoursesRaw = t("courses.englishCourses", {
    returnObjects: true,
  });
  const englishCourses = Array.isArray(englishCoursesRaw)
    ? englishCoursesRaw
    : [];
  const specificPurposesRaw = S("specificPurposes", { returnObjects: true });
  const specificPurposes = Array.isArray(specificPurposesRaw)
    ? specificPurposesRaw
    : [];
  const isEnglish = i18next.language !== "ar";

  // Create a mapping between course names in specificPurposeCourses and their IDs in specificPurposes
  // This is language-agnostic since we're using the index to match them
  const courseIndexToIdMap = specificPurposes.reduce((map, course, index) => {
    map[index] = course.id;
    return map;
  }, {});

  const [collapse, setCollapse] = useState(true);

  const findPairedCardId = (sectionId) => {
    if (window.innerWidth < 1285) {
      return null;
    }

    // For English courses
    const englishIndex = englishCourses.findIndex(
      (course) => course.Level === sectionId,
    );
    if (englishIndex !== -1) {
      // If it's an even index, pair with the next card; if odd, pair with the previous card
      const pairedIndex =
        englishIndex % 2 === 0 ? englishIndex + 1 : englishIndex - 1;
      // Make sure the paired index is valid
      if (pairedIndex >= 0 && pairedIndex < englishCourses.length) {
        return englishCourses[pairedIndex].Level;
      }
    }

    // For specific purpose courses
    const specificIndex = specificPurposes.findIndex(
      (course) => course.id === sectionId,
    );
    if (specificIndex !== -1) {
      // If it's an even index, pair with the next card; if odd, pair with the previous card
      const pairedIndex =
        specificIndex % 2 === 0 ? specificIndex + 1 : specificIndex - 1;
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
  };

  // Use IntersectionObserver to optimize rendering of course sections
  useEffect(() => {
    const sections = document.querySelectorAll(".course-section");
    // Use IntersectionObserver to optimize rendering
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When a section comes into view, optimize it
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              // Apply will-change only when needed
              entry.target.style.willChange = "transform";
            } else {
              entry.target.style.willChange = "auto";
              entry.target.classList.remove("visible");
            }
          });
        },
        {
          rootMargin: "100px 0px",
          threshold: 0.1,
        },
      );

      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    }
  }, []);

  return (
    <>
      <main className="courses">
        <div className="container">
          <div className="content">
            <div className="courses-hero">
              <div className="hero-content">
                <h1 className="hero-subtitle">
                  {t("courses.sectionTitles.courseCategories")}
                </h1>
                <p className="hero-description">
                  {t("courses.intro.description")}
                </p>
              </div>

              <div className="category-grid">
                {/* ESL Card */}
                <CategoryCard
                  className="esl-card"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  }
                  title={t("courses.sectionTitles.esl")}
                  description={t("courses.intro.eslDescription")}
                  linkTo="#general-english"
                  linkText={t("courses.common.exploreButton")}
                  scrollTarget="generalEnglish-section"
                />

                {/* EFP Card */}
                <CategoryCard
                  className="efp-card"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  }
                  title={t("courses.sectionTitles.efp")}
                  description={t("courses.intro.efpDescription")}
                  linkTo="#specificPurposes-section"
                  scrollTarget="specificPurposes-section"
                >
                  <CourseTags
                    courses={specificPurposeCourses}
                    courseIdMap={courseIndexToIdMap}
                  />
                </CategoryCard>

                {/* Phrases Card */}
                <CategoryCard
                  className="phrases-card"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  }
                  title={H("headerTitle")}
                  description={t("courses.intro.phrasesDescription")}
                >
                  <LanguageTags languages={languages} />
                </CategoryCard>

                {/* Other Languages Card */}
                <CategoryCard
                  className="other-card"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  }
                  title={t("courses.sectionTitles.languages")}
                  description={t("courses.intro.otherLanguagesDescription")}
                  linkTo={`/${i18next.language}/contact`}
                  linkText={t("courses.common.contactUsLink")}
                />
              </div>
            </div>
          </div>
          <CourseSection
            id="generalEnglish-section"
            title={t("courses.sectionTitles.esl").slice(2)}
            courses={englishCourses}
            collapse={collapse}
            toggleCollapse={toggleCollapse}
            isEnglish={isEnglish}
            CourseComponent={LazyCourseCard}
            componentProps={{ t }}
          />

          <CourseSection
            id="specificPurposes-section"
            title={t("courses.sectionTitles.efp").slice(2)}
            courses={specificPurposes}
            collapse={collapse}
            toggleCollapse={toggleCollapse}
            isEnglish={isEnglish}
            CourseComponent={SpecificPurposes}
            componentProps={{ S }}
          />
        </div>
      </main>
    </>
  );
};

export default Courses;
