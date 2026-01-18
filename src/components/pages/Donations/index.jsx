import React from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';
import { Trans, useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Donation = () => {
  const { t } = useTranslation("pages/donation");
  const contributionsList = t("contributions.items", { returnObjects: true });
  return (
    <div className='donation'>
      <div className='container'>
        <header>
          <h1>{t("header.title")}</h1>
          <p>
            <Trans
              components={{
                l: <Link to={"#"} target='_blank' />,
                l2: <Link to={"#"} target='_blank' />
              }}
            >
              {t("header.description")}
            </Trans>
          </p>
          <picture className='wavy-container'>
            <img width={500} height={335} src='https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/w_600/v1723499391/donate_1000x667_c9o1wl.jpg' alt="Donation" />
          </picture>
        </header>

        <section className='contributions'>
          <h2>{t("contributions.title")}</h2>
          <p>
            {t("contributions.description1")}
          </p>
          <p>
            {t("contributions.description2")}
          </p>

          <ul className='contributions_list'>
            {contributionsList.map((contribution) =>
              <li key={contribution}>{contribution}</li>
            )}
          </ul>
          <p>
            {t("contributions.description3")}
          </p>
        </section>

        <section>
          <h2>{t("otherWays.title")}</h2>
          <p>
            <Trans
              components={{
                l: <Link to={`/${i18next.language}/pages/feedback`} />
              }}
            >
              {t("otherWays.description")}
            </Trans>
          </p>
          <p><BiHeart color='green' fontSize={18} />{t("otherWays.thank_you_note")}</p>
        </section>
      </div>
    </div>
  );
};

export default Donation;
