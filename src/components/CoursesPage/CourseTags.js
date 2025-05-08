import React from 'react';
import { scrollToElementInSection } from '../../utils/scrollUtils';

const CourseTags = ({ courses, courseIdMap }) => {
  return (
    <div className="course-tags">
      {courses.map((course, index) => (
        <span
          key={index}
          className="course-tag"
          onClick={() => {
            // Get the course ID from the mapping
            const courseId = courseIdMap[index];
            if (courseId) {
              // Use the utility function to scroll to the section and then to the specific course
              scrollToElementInSection(
                'specificPurposes-section',
                courseId,
                600,
                500,
                500,
                20,
                50
              );
            }
          }}
        >
          {course}
        </span>
      ))}
    </div>
  );
};

export default CourseTags;
