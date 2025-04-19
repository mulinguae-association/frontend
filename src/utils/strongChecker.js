const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isVAlidEmail = (email) => {
  return emailPattern.test(email);
}

export const isStrongPassword = (password = '', t, returnBoolean = false) => {
  // If password is empty, don't show any errors yet
  if (!password) return returnBoolean ? false : '';

  // Check all requirements
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // If we just need a boolean result
  if (returnBoolean) {
    return hasMinLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  }

  // For error messages, we need the translation function
  if (!t) return '';

  const failedRequirements = [];

  if (!hasMinLength) {
    failedRequirements.push(t("strongPasswordRules.length"));
  }

  if (!hasUppercase) {
    failedRequirements.push(t("strongPasswordRules.uppercase"));
  }

  if (!hasLowercase) {
    failedRequirements.push(t("strongPasswordRules.lowercase"));
  }

  if (!hasDigit) {
    failedRequirements.push(t("strongPasswordRules.digit"));
  }

  if (!hasSpecialChar) {
    failedRequirements.push(t("strongPasswordRules.specialCharacter"));
  }

  if (failedRequirements.length > 0) {
    return failedRequirements[0];
  }

  // All requirements passed
  return '';
};