import Header from '../../../HeaderPages/Header'
import { useParams } from 'react-router-dom';
import NotFound from '../../../NotFound/NotFound';
import Footer from '../../../FooterPages/Footer';
import Multilingualism from '../../../pages/Multilingualism/Multilingualism';
import Linguicide from '../../../pages/Linguicide/Linguicide';
import Teachers from '../../../pages/Teachers/Teachers';
import Students from '../../../pages/Students/Students';
import Blogs from '../../../pages/Blogs/Blogs';
import { useTranslation } from 'react-i18next';

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