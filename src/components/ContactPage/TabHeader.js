import React from 'react';
import { useTranslation } from 'react-i18next';
import './TabHeader.scss';

const TabHeader = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation("contact");

  return (
    <div className="card-header">
      <div className="tab-header">
        <div className="tabs-container">
          <div className="tabs-list">
            <button
              className={`tab-trigger ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveTab('teacher')}
            >
              {t("buttons.teacherButton")}
            </button>
            <button
              className={`tab-trigger ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              {t("buttons.studentButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
