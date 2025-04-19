import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/PasswordValidator.scss';

const PasswordValidator = ({ password }) => {
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

  // Calculate overall strength (0-5)
  const calculateStrength = () => {
    if (!password) return 0;
    return requirements.filter(req => req.isValid(password)).length;
  };

  const strength = calculateStrength();
  const strengthPercentage = (strength / requirements.length) * 100;

  // Get color based on strength
  const getStrengthColor = () => {
    if (strength === 0) return '#ddd';
    if (strength === 1) return '#f44336'; // red
    if (strength === 2) return '#ff9800'; // orange
    if (strength === 3) return '#ffeb3b'; // yellow
    if (strength === 4) return '#8bc34a'; // light green
    return '#4caf50'; // green
  };

  // Get strength label
  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength === 1) return t("passwordStrength.veryWeak");
    if (strength === 2) return t("passwordStrength.weak");
    if (strength === 3) return t("passwordStrength.medium");
    if (strength === 4) return t("passwordStrength.strong");
    return t("passwordStrength.veryStrong");
  };

  return (
    <div className="password-validator">
      {/* Strength meter */}
      <div className="strength-meter">
        <div
          className="strength-progress"
          style={{
            width: `${strengthPercentage}%`,
            backgroundColor: getStrengthColor()
          }}
        ></div>
      </div>

      {/* Strength label */}
      {password && (
        <div className="strength-label" style={{ color: getStrengthColor() }}>
          {getStrengthLabel()}
        </div>
      )}

      {/* Requirements list */}
      <div className="requirements-list">
        {requirements.map((req) => {
          const isValid = password ? req.isValid(password) : false;
          return (
            <div key={req.key} className={`requirement ${isValid ? 'valid' : 'invalid'}`}>
              {isValid ?
                <FaCheck className="icon-check" /> :
                <FaTimes className="icon-times" />
              }
              <span>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordValidator;
