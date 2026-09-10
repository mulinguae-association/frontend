import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('global');
  return (
    <section id={id} className="course-section">
      <h2>{title}</h2>
      <div className="content">
        <div className="optimized-list">
          {courses.map((course) => (
            <div key={course.id} className="optimized-item">
              <Suspense fallback={<div className="card-loader">{t('app.loading')}</div>}>
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
