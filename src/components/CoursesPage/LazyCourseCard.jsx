import React from 'react'
import { FaArrowDown, FaArrowUp, FaStar } from 'react-icons/fa'

const LazyCourseCard = ({ collapse, course, toggleCollapse, isEnglish, t }) => {
  return (
    <div
      className={`course-details ${collapse[course.Level] ? "collapse" : ""}`}
      key={course.id}
      onClick={collapse[course.Level] ? () => toggleCollapse(course.Level) : undefined}
    >
      <h2 style={collapse[course.Level] ? { height: "30px", display: "flex", alignItems: "center" } : {}}>{course.CourseName} {
        `${collapse[course.Level]
          && +course.id !== 1
          && isEnglish ? (course.Level.slice(0, 8))
          : collapse[course.Level] && +course.id !== 1 ?
            course.Level.slice(0, 10) : ''}`}
      </h2>
      <span
        className="collapseBtn"
        onClick={(e) => {
          e.stopPropagation();
          toggleCollapse(course.Level);
        }}
        onKeyDown={(e) => e.key === 'Enter' && toggleCollapse(course.Level)}
        role="button"
        tabIndex="0"
        title={collapse[course.Level] ? "Expand course details" : "Collapse course details"}
        aria-expanded={!collapse[course.Level]}
      >
        {collapse[course.Level] ? <FaArrowDown /> : <FaArrowUp />}
      </span>
      <p><strong>{t("courses.englishCoursesTitle.Level")}</strong> {course.Level}</p>
      <p><strong>{t("courses.englishCoursesTitle.Duration")}</strong> {course.Duration}</p>
      <p><strong>{t("courses.englishCoursesTitle.Description")}</strong> {course.Description}</p>
      <h3>{t("courses.englishCoursesTitle.LearningOutcomes")}</h3>
      <ul className="outcome-list">
        {course.LearningOutcomes.map((outcome, outcomeIndex) => (
          <li key={outcomeIndex}><FaStar size={15} /> {outcome}</li>
        ))}
      </ul>
    </div>
  )
}

export default LazyCourseCard