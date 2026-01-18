import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/PasswordRequirements.scss';

const PasswordRequirements = ({ password }) => {
  const { t } = useTranslation("global");

  // Define the requirements and their validation functions
  const requirements = [
    {
      key: 'length',
      label: t("strongPasswordRules.length"),
      isValid: (pwd) => pwd.length >= 8
    },
    {
      key: 'uppercase',
      label: t("strongPasswordRules.uppercase"),
      isValid: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      key: 'lowercase',
      label: t("strongPasswordRules.lowercase"),
      isValid: (pwd) => /[a-z]/.test(pwd)
    },
    {
      key: 'digit',
      label: t("strongPasswordRules.digit"),
      isValid: (pwd) => /\d/.test(pwd)
    },
    {
      key: 'specialCharacter',
      label: t("strongPasswordRules.specialCharacter"),
      isValid: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
    }
  ];

  // Count how many requirements are met
  const metRequirements = password ? requirements.filter(req => req.isValid(password)).length : 0;
  const totalRequirements = requirements.length;

  return (
    <div className="password-requirements">
      <div className="requirements-header">
        <h4>{t("passwordRequirementsTitle") || "Password Requirements"}</h4>
        <div className="requirements-count">
          {metRequirements}/{totalRequirements}
        </div>
      </div>
      <ul>
        {requirements.map((req, index) => {
          const isValid = password ? req.isValid(password) : false;
          return (
            <li
              key={req.key}
              className={isValid ? 'valid' : 'invalid'}
              style={{
                transitionDelay: `${index * 0.05}s`,
                animationDelay: `${index * 0.05}s`
              }}
            >
              {isValid ? <FaCheck className="check-icon" /> : <FaTimes className="times-icon" />}
              <span>{req.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
