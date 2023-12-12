import React from 'react'
import { useTranslation } from 'react-i18next'
import PrivacyCover from './PrivacySections/PrivacyCover'
import DataCollectionSummary from './PrivacySections/DataCollectionSummary'
import DataCollection from './PrivacySections/DataCollection'
import DataUsing from './PrivacySections/DataUsing'
import CookiesInformations from './PrivacySections/CookiesInformations'
import DataSharing from './PrivacySections/DataSharing'
import SocialFeatures from './PrivacySections/SocialFeatures'
import DataUsage from './PrivacySections/DataUsage'
import DataRetention from './PrivacySections/DataRetention'
import DataProtection from './PrivacySections/DataProtection'
import DataControl from './PrivacySections/DataControl'
import Complaints from './PrivacySections/Complaints'
import DataChanging from './PrivacySections/DataChanging'
import ContactUs from './PrivacySections/ContactUs'

const MainContent = () => {
  const { t } = useTranslation("privacy&terms/privacy")
  return (
    <main className='main_content'>
      <header>
        <span className='EffectiveDate'>{t("EffectiveDate")}</span>
        <h1>{t("ContentHead")}</h1>
      </header>
      {/* sections */}
      <PrivacyCover />
      <DataCollectionSummary />
      <DataCollection />
      <DataUsing />
      <CookiesInformations />
      <DataSharing />
      <SocialFeatures />
      <DataUsage />
      <DataRetention />
      <DataProtection />
      <DataControl />
      <Complaints />
      <ContactUs />
      <DataChanging />
      {/* end sections */}
    </main>
  )
}

export default MainContent