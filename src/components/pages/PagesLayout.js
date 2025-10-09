import Header from "../HeaderPages";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PagesLayout = () => {
  const location = useLocation();
  const translatedPageId = location.pathname.split("/")[3];
  const { t } = useTranslation("header");

  return (
    <div>
      <>
        <Header pageName={`${t("currpage")} >> ${translatedPageId}`} />
        <Outlet />
      </>
    </div>
  );
};

export default PagesLayout;
