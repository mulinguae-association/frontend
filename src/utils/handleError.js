import i18n from "../i18n";

const handleError = (error) => {
  let errorMessage = i18n.t("global:errorMessages:default");

  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 400:
        errorMessage = i18n.t("global:errorMessages:400");
        break;
      case 401:
        errorMessage = i18n.t("global:errorMessages:401");
        break;
      case 403:
        errorMessage = i18n.t("global:errorMessages:403");
        break;
      case 404:
        errorMessage = i18n.t("global:errorMessages:404");
        break;
      case 500:
        errorMessage = i18n.t("global:errorMessages:500");
        break;
      case 502:
        errorMessage = i18n.t("global:errorMessages:502");
        break;
      case 503:
        errorMessage = i18n.t("global:errorMessages:503");
        break;
      case 504:
        errorMessage = i18n.t("global:errorMessages:504");
        break;
      default:
        errorMessage = i18n.t("global:errorMessages:default");
    }
  }

  return errorMessage;
};

export default handleError;
