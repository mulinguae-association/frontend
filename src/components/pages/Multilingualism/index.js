import React from 'react'
import "./Multilingualism.scss"
import "../pagesStyle.scss"
import { useTranslation } from 'react-i18next'
import PrintBtn from '../../PrintButton'
import { useRef } from 'react'
const Multilingualism = () => {
  const { t } = useTranslation('pages/multilingualism', { ns: 'multilingualism' });
  const { t: global } = useTranslation('global', { ns: 'global' });
  const componentRef = useRef()
  return (
    <main>
      <div className='container'>
        <section className='section multilingulism_info' ref={componentRef}>
          <div className='print_btn'>
            <PrintBtn print={global("print")} componentRef={componentRef} />
          </div>
          <h2 className='page_title'>{t("page_title")}</h2>
          <h2 className='head'>{t("definition_head")}</h2>
          <p className='about'>{t("about_definition")}</p>
          <p className='about'>{t("about_definition2")}</p>
          <p className='about'>{t("about_definition3")}</p>
          <p className='about'>{t("about_definition4")}</p>
          <p className='about'>{t("about_definition5")}</p>
          <p className='about'>{t("about_definition6")}</p>
          <h2 className='head'>{t("importanceLanguage_head")}</h2>
          <p className='about'>{t("about_importanceLang")}</p>
          <p className='about'>{t("about_importanceLang2")}</p>
          <p className='about'>
            <span>{t("about_importanceLang3")}</span>
            <span><a className='link' href='https://www.un.org/en/about-us/universal-declaration-of-human-rights'>{t("link")}</a></span>
            <span>{t("about_importanceLang4")}</span>
            <span><a className='link' href='https://www.unesco.org/en/legal-affairs/recommendation-concerning-promotion-and-use-multilingualism-and-universal-access-cyberspace?hub=66535'>{t("link2")}</a></span>
            <span>{t("about_importanceLang5")}</span>
          </p>
          <p className='about'>
            {t("about_importanceLang6")}
            <span><a className='link' href='https://documents-dds-ny.un.org/doc/UNDOC/GEN/N19/426/26/PDF/N1942626.pdf?OpenElement'>{t("link3")}</a></span>
            {t("about_importanceLang7")}
            <span><a className='link' href='https://idil2022-2032.org/'>{t("link4")}</a></span>
            {t("about_importanceLang8")}</p>
          <h2 className='head'>{t("linguaFranca_head")}</h2>
          <p className='about'>
            <span>{t("about_linguaFranca")}</span>
            <span><a className='link' href="https://www.un.org/fr/department-global-communications">{t("link5")}</a></span>
            <span>{t("about_linguaFranca2")}</span>
            <span><a className='link' href="https://www.un.org/en/multilingualism-web-standards">{t("link6")}</a></span>
            <span><a className='link' href="https://www.un.org/en/our-work/official-languages">{t("link7")}</a></span>
          </p>
          <h2 className='head'>{t("langFacts_head")}</h2>
          <ol>
            <li className='about'>{t("about_langFacts")}</li>
            <li className='about'>{t("about_langFacts2")}</li>
            <li className='about'>
              <span>{t("about_langFacts3")}</span>
              <span><a className='link' href='https://press.un.org/en/2022/ga12425.doc.htm'>{t("link8")}</a></span>
            </li>
            <li className='about'>{t("about_langFacts4")}</li>
            <li className='about'>{t("about_langFacts5")}</li>
            <li className='about'>{t("about_langFacts6")}</li>
            <li className='about'>{t("about_langFacts7")}</li>
            <li className='about'>{t("about_langFacts8")}</li>
            <li className='about'>{t("about_langFacts9")}</li>
            <li className='about'>{t("about_langFacts10")}</li>
            <li className='about'>{t("about_langFacts11")}</li>
            <li className='about'>
              {t("about_langFacts12")}
              <span>
                <a className='link' href='https://www.unjiu.org/sites/www.unjiu.org/files/jiu_rep_2020_6_english.pdf'>
                  {t("link9")}
                </a>
              </span>
            </li>
            <li className='about'>
              {t("about_langFacts13")}
              <span><a className='link' href='Department of Global Communications'>{t("link10")}</a></span>
              {t("about_langFacts14")}
              <span><a className='link' href='minimum standards for UN web multilingualism'>{t("link11")}</a></span><br />
              <span><a className='link' href='minimum standards for UN web multilingualism'>{t("link12")}</a></span>
            </li>
            <li className='about'>
              <span>{t("about_langFacts15")}</span><br />
              <span><a className='link' href='https://www.unesco.org/en/decades/indigenous-languages'>{t("link13")}</a></span>
            </li>
            <li className='about'>
              <span>{t("about_langFacts16")}</span> <br />
              <span><a className='link' href='https://www.cambridgeenglish.org/Images/539682-perspectives-impact-on-multilingualism.pdf'>{t("link14")}</a></span>
            </li>
          </ol>
        </section>
      </div>
    </main >
  )
}

export default Multilingualism