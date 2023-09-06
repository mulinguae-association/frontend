import React from "react"
import Header from '../../../HeaderPages'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Teachers = React.lazy(() =>
  import("../../../pages/Teachers")
);
const Students = React.lazy(() =>
  import("../../../pages/Students")
);
const Blogs = React.lazy(() =>
  import("../../../pages/Blogs")
);
const Linguicide = React.lazy(() =>
  import("../../../pages/Linguicide")
);
const Multilingualism = React.lazy(() =>
  import("../../../pages/Multilingualism")
);
const Footer = React.lazy(() =>
  import("../../../FooterPages")
);
const NotFound = React.lazy(() =>
  import("../../../NotFound")
);

const PagesDetails = () => {
  const { t: trans } = useTranslation("pages/pagesLinks")
  const { pageId } = useParams();
  const translatedPageId = trans(pageId);
  const { t } = useTranslation("header")

  let pageContent;
  let renderHeaderFooter = true
  switch (pageId) {
    case 'Multilingualism':
      pageContent = <Multilingualism />;
      break;
    case 'Linguicide':
      pageContent = <Linguicide />;
      break;
    case 'Teachers':
      pageContent = <Teachers />;
      break;
    case 'Students':
      pageContent = <Students />;
      break;
    case 'Blogs':
      pageContent = <Blogs />;
      break;
    default:
      pageContent = <NotFound />;
      renderHeaderFooter = false
      break;
  }

  return <div>
    {renderHeaderFooter && <Header pageName={`${t("currpage")} >> ${translatedPageId}`} />}
    {pageContent}
    {renderHeaderFooter && <Footer />}
  </div>;
}

export default PagesDetails