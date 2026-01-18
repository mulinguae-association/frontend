import React, { useRef } from 'react';
import "./hundredPhrases.scss";
import { useTranslation } from 'react-i18next';
import PrintBtn from '../../PrintButton';
const HundredPhrases = () => {
  const { t } = useTranslation("pages/hundredPhrases");
  const { t: global } = useTranslation("global", { ns: "global" });
  const phrases = t('phrases', { returnObjects: true });
  const componentRef = useRef();
  let globalIndex = 0;
  return (
    <main className='hundred_phrases' ref={componentRef}>
      <div className='container'>
        <h1>{t("headerTitle")}</h1>
        <div className='print_btn'>
          <PrintBtn print={global("print")} componentRef={componentRef} />
        </div>
        <section className='content'>
          {phrases.map((section, index) => {
            return (
              <div className='block' key={index}>
                <h2>{t(`phrases.${index}.title`)}</h2>
                {
                  section.img && section.alt &&
                  <div className='img_container'>
                    <img src={t(`phrases.${index}.img`)} alt={t(`phrases.${index}.alt`)} />
                  </div>
                }
                <ul>
                  {section.phrases.map((phrase, subIndex) => {
                    if (typeof phrase !== 'object') {
                      globalIndex++;
                    }
                    return (
                      <li key={`${globalIndex}`}>
                        {typeof phrase === 'object' ? (
                          <div>
                            <h3 className='subTitle'>{phrase.subtitle}</h3>
                            <ul className='nested_phrases'>
                              {phrase.phrases.map((subphrase, subphraseIndex) => {
                                globalIndex++;
                                return (
                                  <li key={subphraseIndex}>
                                    <span>{globalIndex}- {subphrase}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        ) : (
                          <span>{globalIndex}- {phrase}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </section>
      </div>
    </main >
  )
}

export default HundredPhrases
