import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/PasswordStrengthMeter.scss';

const PasswordStrengthMeter = ({ password }) => {
  const { t } = useTranslation("authPages/register");

  const calculateStrength = (password) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1; // Has uppercase
    if (/[a-z]/.test(password)) strength += 1; // Has lowercase
    if (/[0-9]/.test(password)) strength += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Has special char

    return Math.min(strength, 5); // Max strength is 5
  };

  const getStrengthLabel = (strength) => {
    if (strength === 0) return t("passwordStrength.none");
    if (strength === 1) return t("passwordStrength.veryWeak");
    if (strength === 2) return t("passwordStrength.weak");
    if (strength === 3) return t("passwordStrength.medium");
    if (strength === 4) return t("passwordStrength.strong");
    return t("passwordStrength.veryStrong");
  };

  // Get the color based on password strength
  // These colors match the variables in _colors.scss
  const getStrengthColor = (strength) => {
    if (strength === 0) return '#ddd'; // $lighter-gray
    if (strength === 1) return '#f00'; // $strength-very-weak
    if (strength === 2) return '#ff5722'; // $strength-weak
    if (strength === 3) return '#ffc107'; // $strength-medium
    if (strength === 4) return '#4caf50'; // $strength-strong
    return '#2e7d32'; // $strength-very-strong
  };

  const strength = calculateStrength(password);
  const strengthLabel = getStrengthLabel(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="password-strength-meter">
      <div className="strength-bars">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`strength-bar ${index <= strength ? 'filled' : ''}`}
            style={{
              backgroundColor: index <= strength ? strengthColor : '#e0e0e0', // $light-border
              boxShadow: index <= strength ? `0 0 4px ${strengthColor}` : 'none',
              transform: index <= strength ? 'scale(1.2)' : 'scale(1)',
              transition: `all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s`
            }}
          />
        ))}
      </div>
      <div className="strength-label" style={{ color: strengthColor }}>
        {password && strengthLabel}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
