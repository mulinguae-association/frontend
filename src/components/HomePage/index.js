import React from "react";
import { useTranslation } from "react-i18next";
import "./Home.scss";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
const Home = ({ imgAnimation }) => {
	const { t, i18n: { language: lang }, ready } = useTranslation("home", { ns: "home" });
	const langAr = ["Ar", "Ur"].includes(i18n.language) // check if language is Arabic
	const langQu = i18n.language === "Qu"; // check if language is Arabic
	return (
		<main className='hero_section'>
			<div className="hero_image_wrapper">
				<picture>
					<source media="(max-width:256px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto/w_256/v1707246265/amazonPeople_q4i8zs.webp 256w" />
					<source media="(max-width:480px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto/w_480/v1707246265/amazonPeople_q4i8zs.webp 480w" />
					<source media="(max-width:768px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto/w_768/v1707246265/amazonPeople_q4i8zs.webp 768w" />
					<img fetchpriority="high" decoding="async" loading="eager"
						src="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,q_auto/v1707246265/amazonPeople_q4i8zs.webp" alt="Hero_image"
						width="100"
						height='100'
					/>
				</picture>
			</div>
			<div className='container'>
				<div className='hero_content'>
					<div className='hero_info'>
						<h1
							id='websiteName'
							style={langQu ? { fontSize: "2.2rem" } : {}}
							className='hero_title'>
							{t("hero_title").split("\\n").join("\n")}
						</h1>
						<div
							className={`img_info_container ${imgAnimation ? "reload-animation" : ""
								} `}>
							<picture>
								<source media="(max-width:256px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_256/v1707246278/earth_fnjwsd.webp 256w" />
								<source media="(max-width:384px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_384/v1707246278/earth_fnjwsd.webp 384w" />
								<source media="(max-width:1024px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp 640w" />
								<source media="(max-width:640px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp 640w" />
								<img
									fetchpriority="high"
									src={"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp"}
									alt='multiLang_img'
									loading="eager"
									decoding="async"
									width="100%"
									height="100%"
								/>
							</picture>
						</div>
						{ready &&
							<p
								id='websiteDescription'
								style={langQu ? { textAlign: "initial" } : {}}
								className='hero_description'>
								<span>{t("before_des_link")}</span>
								<Link className='des_link' to={`/${lang}/courses`}>
									{t("first_link")}
								</Link>
								<span>{t("after_des_link")}</span>
								<Link className='des_link' to={`/${lang}/pages/Multilingualism`}>
									{t("second_link")}
								</Link>
								<span>{t("after_des_link2")}</span>
								<Link className='des_link' to={`/${lang}/`}>
									{t("third_link")}
								</Link>
								<span>{t("last_des_link")}</span>
							</p>
						}
						<Link className='hero_btn change_direction' to={`/${lang}/about`}>
							<div className='btn_container'>
								<button
									name='read-more'
									type='button'
									title='Learn more about our company'
									aria-labelledby='websiteName websiteDescription'>
									<span className='visually-hidden'>
										Learn More about our Company
									</span>
									{t("hero_button")}
								</button>
								<span
									className={`arrow arrow-first ${langAr ? "change_dir" : ""
										}`}></span>
								<span
									className={`arrow arrow-second ${langAr ? "change_dir" : ""
										}`}></span>
							</div>
						</Link>
					</div>
					<div
						className={`img_container reload-animation  ${imgAnimation ? "reload-animation" : ""
							}`}>
						<picture>
							<img
								fetchpriority="high"
								srcSet="
								https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp 640w,
								https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_750/v1707246278/earth_fnjwsd.webp 750w"
								sizes="(max-width: 640px) 640px, (max-width: 750px) 750px, 100vw"
								src={"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_750/v1707246278/earth_fnjwsd.webp"}
								alt='multiLang_img'
								loading="eager"
								width="700px"
								height="350px"
								decoding="async"
							/>
						</picture>
					</div>
				</div>
			</div>
		</main>
	);
};
export default Home;
