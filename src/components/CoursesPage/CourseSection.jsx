import React, { Suspense } from 'react';

const CourseSection = ({
  id,
  title,
  courses,
  collapse,
  toggleCollapse,
  isEnglish,
  CourseComponent,
  componentProps = {}
}) => {
  return (
    <section id={id} className="course-section">
      <h2>{title}</h2>
      <div className="content">
        <div className="optimized-list">
          {courses.map((course) => (
            <div key={course.id} className="optimized-item">
              <Suspense fallback={<div className="card-loader">Loading...</div>}>
                <CourseComponent
                  course={course}
                  collapse={collapse}
                  toggleCollapse={toggleCollapse}
                  isEnglish={isEnglish}
                  {...componentProps}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
