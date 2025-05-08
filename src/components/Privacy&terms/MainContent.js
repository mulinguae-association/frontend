import React, { useEffect } from 'react'
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

  useEffect(() => {
    // Apply performance optimizations when component mounts
    const sections = document.querySelectorAll('section');

    // Use IntersectionObserver to optimize rendering
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // When a section comes into view, optimize it
            if (entry.isIntersecting) {
              // Add a class to indicate this section is visible
              entry.target.classList.add('visible');

              // Apply will-change only when needed
              entry.target.style.willChange = 'transform';
            } else {
              // Remove will-change when not needed to free up resources
              entry.target.style.willChange = 'auto';
              entry.target.classList.remove('visible');
            }
          });
        },
        {
          rootMargin: '100px 0px',
          threshold: 0.1
        }
      );

      sections.forEach(section => {
        observer.observe(section);
      });

      return () => {
        sections.forEach(section => {
          observer.unobserve(section);
        });
      };
    }
  }, []);

  return (
    <main className='main_content'>
      <header>
        <span className='EffectiveDate'>{t("EffectiveDate")}</span>
        <h1>{t("ContentHead")}</h1>
      </header>

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
    </main>
  )
}

export default MainContent