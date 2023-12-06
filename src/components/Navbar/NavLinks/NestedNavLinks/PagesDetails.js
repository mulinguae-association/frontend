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
const HundredPhrases = React.lazy(() =>
  import("../../../pages/hundredPhrases")
);
const FAQs = React.lazy(() =>
  import("../../../pages/FAQs")
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
  let renderHeader = true
  let renderFooter = true
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
      renderFooter = false
      break;
    case '100-basic-phrases':
      pageContent = <HundredPhrases />;
      break;
    case 'FAQs':
      pageContent = <FAQs />;
      break;
    default:
      pageContent = <NotFound />;
      renderHeader = false
      renderFooter = false
      break;
  }

  return <div>
    {renderHeader && <Header pageName={`${t("currpage")} >> ${translatedPageId}`} />}
    {pageContent}
    {renderFooter && <Footer />}
  </div>;
}

export default PagesDetails