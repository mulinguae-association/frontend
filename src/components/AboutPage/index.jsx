import { useTranslation, Trans } from "react-i18next";
import Header from "../HeaderPages";
import "./About.scss";
import PrintBtn from "../PrintButton";
import { useRef } from "react";
import PreloadImages from "../../utils/PreloadImages";
import { HelmetProvider } from "react-helmet-async";

const About = () => {
  const { t } = useTranslation("about", { ns: "about" });
  const { t: global } = useTranslation("global", { ns: "global" });
  const componentRef = useRef();

  const criticalImages = [
    "https://res.cloudinary.com/dfnwjr7vo/image/upload/w_256/v1707342711/education_mission_iupsiq.webp 256w",
    "https://res.cloudinary.com/dfnwjr7vo/image/upload/w_480/v1707342711/education_mission_iupsiq.webp 480w",
    "https://res.cloudinary.com/dfnwjr7vo/image/upload/w_768/v1707342711/education_mission_iupsiq.webp 768w",
    "https://res.cloudinary.com/dfnwjr7vo/image/upload/w_1024/v1707342711/education_mission_iupsiq.webp 1024w",
    "https://res.cloudinary.com/dfnwjr7vo/image/upload/w_1280/v1707342711/education_mission_iupsiq.webp 1280w",
  ];
  const imagesizes =
    "(max-width:256px) 256px,(max-width:480px) 480px,(max-width:768px) 768px,(max-width:1024px) 1024px,(max-width:1280px) 1280px";

  const imgSrc =
    "https://res.cloudinary.com/dfnwjr7vo/image/upload/w_1280/v1707342711/education_mission_iupsiq.webp";

  return (
    <main className="about_us">
      <HelmetProvider>
        <PreloadImages
          imgSrc={imgSrc}
          imageSources={criticalImages}
          imageSizes={imagesizes}
          priority
        />
      </HelmetProvider>
      <Header pageName={t("currLink")} />
      <section className="about_us_info" ref={componentRef}>
        <div className="container">
          <PrintBtn print={global("print")} componentRef={componentRef} />

          <article className="our_mission">
            <header className="title">
              <h2 className="header">{t("mission_head")}</h2>
              <img
                src="/images/icons/ourMissionIcon.svg"
                loading="lazy"
                alt="our mission"
              />
            </header>
            <div className="group">
              <picture>
                <source
                  media="(max-width:256px)"
                  srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/w_256/v1707342711/education_mission_iupsiq.webp 256w"
                />
                <source
                  media="(max-width:480px)"
                  srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/w_480/v1707342711/education_mission_iupsiq.webp 480w"
                />
                <source
                  media="(max-width:768px)"
                  srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/w_768/v1707342711/education_mission_iupsiq.webp 768w"
                />
                <source
                  media="(max-width:1024px)"
                  srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/w_1024/v1707342711/education_mission_iupsiq.webp 1024w"
                />
                <source
                  media="(max-width:1280px)"
                  srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/w_1280/v1707342711/education_mission_iupsiq.webp 1280w"
                />
                <img
                  fetchpriority="high"
                  className={`about_img`}
                  src="https://res.cloudinary.com/dfnwjr7vo/image/upload/w_1280/v1707342711/education_mission_iupsiq.webp"
                  width="1100px"
                  height="450px"
                  loading="eager"
                  alt="aboutUs"
                />
              </picture>
              <div>
                <p>
                  <Trans
                    i18nKey="about_mission"
                    t={t}
                    components={{ bold: <strong /> }}
                  />
                </p>
                {t("about_mission2") ? (
                  <p>
                    <strong>{t("about_mission2")}</strong>
                  </p>
                ) : null}
              </div>
            </div>
          </article>

          <article className="our_story">
            <header className="title">
              <h2 className="header">{t("story_head")}</h2>
              <img
                src="/images/icons/ourStoryIcon.svg"
                alt="our story"
                loading="lazy"
              />
            </header>
            <p className="about">
              <Trans
                i18nKey="about_story"
                t={t}
                components={{ bold: <strong /> }}
              />
            </p>
          </article>

          <article className="our_vision">
            <header className="title">
              <h2 className="header">{t("vision_head")}</h2>
              <img
                src="/images/icons/ourVisionIcon.svg"
                alt="our vision"
                loading="lazy"
              />
            </header>
            <p className="about">
              <Trans
                i18nKey="about_vision"
                t={t}
                components={{ bold: <strong /> }}
              />
            </p>
          </article>

          <article className="our_tutors">
            <header className="title">
              <h2 className="header">{t("tutors_head")}</h2>
              <img
                src="/images/icons/ourTutorsIcon.svg"
                alt="our tutors"
                loading="lazy"
              />
            </header>
            <p className="about">
              <Trans
                i18nKey="about_tutors"
                t={t}
                components={{ bold: <strong /> }}
              />
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default About;
