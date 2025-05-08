import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const SpecificPurposes = ({ collapse, course, toggleCollapse, isEnglish, S }) => {
  return (
    <div
      id={course.id}
      className={`course-details ${collapse[course.id] ? "collapse" : ""}`}
      onClick={collapse[course.id] ? () => toggleCollapse(course.id) : undefined}
    >
      <h2 style={collapse[course.id] ? { height: "30px", display: "flex", alignItems: "center" } : {}}>{course.name}</h2>
      <span
        className="collapseBtn"
        onClick={(e) => {
          e.stopPropagation();
          toggleCollapse(course.id);
        }}
        onKeyDown={(e) => e.key === 'Enter' && toggleCollapse(course.id)}
        role="button"
        tabIndex="0"
        title={collapse[course.id] ? "Expand course details" : "Collapse course details"}
        aria-expanded={!collapse[course.id]}
      >
        {collapse[course.id] ? <FaArrowDown /> : <FaArrowUp />}
      </span>
      <p><strong>{S("specificPurposesTitle.duration")}</strong> {course.duration}</p>
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
  )
}

export default SpecificPurposes