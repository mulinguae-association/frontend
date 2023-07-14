import React, { useRef } from 'react'
import "./Teachers.scss"
import { useTranslation } from 'react-i18next';
import PrintBtn from '../../PrintButton/PrintBtn';
const Teachers = () => {
  const { t } = useTranslation('pages/teachers', { ns: 'teachers' });
  console.log(t("page_title"))
  const { t: global } = useTranslation('global', { ns: 'global' });
  const componentRef = useRef();
  return (
    <main>
      <div className='container'>
        <section className='section multilingulism_info' ref={componentRef}>
          <div className='print_btn'>
            <PrintBtn print={global("print")} componentRef={componentRef} />
          </div>
          <h2 className='page_title'>{t("page_title")}</h2>
          <p className='about'>{t("sec1_about1")}</p>
          <h2 className='head'>{t("sec2_head")}</h2>
          <p className='about'>{t("sec2_about1")}</p>
          <p className='about'>{t("sec2_about2")}</p>
          <p className='about'>{t("sec2_about3")}</p>
          <h2 className='head'>{t("sec3_head")}</h2>
          <p className='about'>{t("sec3_about1")}</p>
          <p className='about'>{t("sec3_about2")}</p>
          <p className='about'>{t("sec3_about3")}</p>
          <p className='about'>{t("sec3_about4")}</p>
          <h2 className='head'>{t("sec4_head")}</h2>
          <p className='about'>{t("sec4_about1")}</p>
          <p className='about'>{t("sec4_about2")}</p>
          <p className='about'>{t("sec4_about3")}</p>
          <h2 className='head'>{t("sec5_head")}</h2>
          <p className='about'>{t("sec5_about1")}</p>
          <p className='about'>{t("sec5_about2")}</p>
          <p className='about'>
            <a className='link' href={`${t("sec5_link1")}`}>
              {t("sec5_link1")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec5_link2")}`}>
              {t("sec5_link2")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec5_link3")}`}>
              {t("sec5_link3")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec5_link4")}`}>
              {t("sec5_link4")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec5_link5")}`}>
              {t("sec5_link5")}
            </a>
          </p>
          <p className='warning'>{t("warning")}</p>
        </section>
      </div>
    </main >
  )
}

export default Teachers