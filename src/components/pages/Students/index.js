import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import PrintBtn from '../../PrintButton';
import "./Students.scss"
import "../pagesStyle.scss"
const Students = () => {
  const { t } = useTranslation('pages/students', { ns: 'students' });
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
          <p className='about'>
            {t("sec1_about1")}
            <span className='text-bold'>{t("sec1_about1_cont")}</span>
          </p>
          <p className='about'>{t("sec1_about2")}</p>
          <p className='about'>{t("sec1_about3")}</p>
          <p className='about'>{t("sec1_about4")}</p>
          <p className='about'>{t("sec1_about5")}</p>
          <p className='about'>{t("sec1_about6")}</p>
          <p className='about'>{t("sec1_about7")}</p>
          <p className='about'>{t("sec1_about8")}</p>
          <p className='about'>
            <a className='link' href={`${t("sec1_link1")}`}>
              {t("sec1_link1")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec1_link2")}`}>
              {t("sec1_link2")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec1_link3")}`}>
              {t("sec1_link3")}
            </a>
          </p>
          <p className='about'>
            <a className='link' href={`${t("sec1_link4")}`}>
              {t("sec1_link4")}
            </a>
          </p>
        </section>
      </div>
    </main >
  )
}

export default Students