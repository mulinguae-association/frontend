import { useTranslation } from "react-i18next";
import "./Home.scss";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import { SEO } from "../SEO";

const Home = ({ imgAnimation }) => {
  const { t, ready } = useTranslation("home", { useSuspense: false });
  const langAr = ["ar", "ur"].includes(i18n.language); // check if language is Arabic
  const langQu = i18n.language === "qu"; // check if language is Arabic

  return (
    <>
      <SEO
        title="Mulinguae | Multilingual Community & Language Exchange"
        description="Mulinguae is a global multilingual community for language exchange and learning. Learn languages with native speakers, connect with people worldwide, and join Mulinguae today. (Not affiliated with Mulingua.)"
        keywords="mulinguae, mulingua, language learning, multilingual, language exchange, native speakers, global community"
        path="/"
        ldJson={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Mulinguae",
          alternateName: "Mulingua",
          url: `https://mulinguae.com/${i18n.language}/`,
          logo: "https://res.cloudinary.com/di24dufhu/image/upload/v1770301054/acs-logo_ctleql.webp",
          sameAs: [
            "https://www.facebook.com/mulinguae",
            "https://twitter.com/mulinguae",
            "https://www.linkedin.com/company/mulinguae",
          ],
          description:
            "Mulinguae is a global multilingual community for language exchange, learning, and cultural connection.",
        }}
      />
      <main className="hero_section">
        <div className="hero_image_wrapper">
          <img
            fetchpriority="high"
            decoding="sync"
            loading="eager"
            src="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_1200/v1726238642/amazon_people.webp"
            srcSet="
              https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_480/v1726238642/amazon_people.webp 480w,
              https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_768/v1726238642/amazon_people.webp 768w,
              https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_1024/v1726238642/amazon_people.webp 1024w,
              https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_1200/v1726238642/amazon_people.webp 1200w
            "
            sizes="(max-width: 768px) 100vw, 1200px"
            alt="Diverse group of people representing multilingualism"
            width={1200}
            height={600}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
        <div className="container">
          <div className="hero_content">
            <div className="hero_info">
              <div className="hero_title_container">
                <h1
                  id="websiteName"
                  style={langQu ? { fontSize: "2.2rem" } : {}}
                  className="hero_title"
                >
                  {t("hero_title").split("\\n").join("\n")}
                </h1>
              </div>
              {/* Mobile/tablet: shows between title and description */}
              <div
                className={`img_info_container ${
                  imgAnimation ? "reload-animation" : ""
                }`}
              >
                <img
                  fetchPriority="high"
                  src="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_640/v1707246278/earth_fnjwsd.webp"
                  srcSet="
                    https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_256/v1707246278/earth_fnjwsd.webp 256w,
                    https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_384/v1707246278/earth_fnjwsd.webp 384w,
                    https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_640/v1707246278/earth_fnjwsd.webp 640w,
                    https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_700/v1707246278/earth_fnjwsd.webp 700w
                  "
                  sizes="(max-width: 640px) 100vw, 640px"
                  alt="Earth illustration representing multilingualism"
                  loading="eager"
                  decoding="async"
                  width={700}
                  height={467}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              {ready && (
                <p
                  id="websiteDescription"
                  style={langQu ? { textAlign: "initial" } : {}}
                  className="hero_description"
                >
                  <span>{t("before_des_link")}</span>
                  <Link className="des_link" to={`courses`}>
                    {t("first_link")}
                  </Link>
                  <span>{t("after_des_link")}</span>
                  <Link className="des_link" to={`pages/multilingualism`}>
                    {t("second_link")}
                  </Link>
                  <span>{t("after_des_link2")}</span>
                  <Link className="des_link" to={``}>
                    {t("third_link")}
                  </Link>
                  <span>{t("last_des_link")}</span>
                </p>
              )}
              <Link className="hero_btn change_direction" to={`about`}>
                <div className="btn_container">
                  <button
                    name="read-more"
                    type="button"
                    title="Learn more about our company"
                    aria-labelledby="websiteName websiteDescription"
                  >
                    <span className="visually-hidden">
                      Learn More about our Company
                    </span>
                    {t("hero_button")}
                  </button>
                  <span
                    className={`arrow arrow-first ${
                      langAr ? "change_dir" : ""
                    }`}
                  ></span>
                  <span
                    className={`arrow arrow-second ${
                      langAr ? "change_dir" : ""
                    }`}
                  ></span>
                </div>
              </Link>
            </div>
            {/* Desktop: shows next to content */}
            <div
              className={`img_info_container reload-animation ${
                imgAnimation ? "reload-animation" : ""
              }`}
            >
              <img
                fetchPriority="high"
                src="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_640/v1707246278/earth_fnjwsd.webp"
                srcSet="
                  https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_640/v1707246278/earth_fnjwsd.webp 640w,
                  https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto:eco,w_700/v1707246278/earth_fnjwsd.webp 700w
                "
                sizes="(max-width: 1024px) 100vw, 700px"
                alt="Earth illustration representing multilingualism"
                loading="eager"
                decoding="async"
                width={700}
                height={350}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
