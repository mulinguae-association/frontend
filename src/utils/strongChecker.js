const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isVAlidEmail = (email) => {
  return emailPattern.test(email);
}

export const isStrongPassword = (password = '', t) => {

  if (!/[A-Z]/.test(password)) return t("strongPasswordRules.uppercase");

  if (!/[a-z]/.test(password)) return t("strongPasswordRules.lowercase");

  if (!/\d/.test(password)) return t("strongPasswordRules.digit");

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return t("strongPasswordRules.specialCharacter");

  if (password.length < 8) return t("strongPasswordRules.length")

  return '';
};