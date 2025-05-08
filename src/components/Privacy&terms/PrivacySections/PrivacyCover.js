import React from 'react'
import { useTranslation } from 'react-i18next'

const PrivacyCover = () => {
  const { t } = useTranslation("privacy&terms/privacy");
  return (
    <section id='policy-cover'>
      <h2>{t("Policy Coverage.title")}</h2>
      <div className='policyPoints'>
        {t("Policy Coverage.policyPoints", { returnObjects: true }).map((ele, index) => <p key={index}>{ele}</p>)}
      </div>
    </section>
  )
}

export default PrivacyCover