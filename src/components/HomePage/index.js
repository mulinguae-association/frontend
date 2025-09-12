import React from "react";
import { useTranslation } from "react-i18next";
import "./Home.scss";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import PreloadImages from "../../utils/PreloadImages";
import { HelmetProvider } from "react-helmet-async";

const Home = ({ imgAnimation }) => {
	const { t, ready } = useTranslation("home", { ns: "home" });
	const langAr = ["ar", "ur"].includes(i18n.language) // check if language is Arabic
	const langQu = i18n.language === "qu"; // check if language is Arabic
	const criticalImages = [
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:low/w_256/v1726238642/amazon_people.webp 256w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:low/w_480/v1726238642/amazon_people.webp 480w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:low/w_640/v1726238642/amazon_people.webp 640w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:low/w_750/v1726238642/amazon_people.webp 750w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:good/w_828/v1726238642/amazon_people.webp 828w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:good/w_1080/v1726238642/amazon_people.webp 1080w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:good/w_1200/v1726238642/amazon_people.webp 1200w"

	]
	const imgSrc = "https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto/q_auto:good/w_1200/v1726238642/amazon_people.webp"
	const imgSrc2 = "https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_700/v1707246278/earth_fnjwsd.webp"
	const imagesizes = "100vw"
	const imagesizes2 = "(max-width:256px) 256px,(max-width:384px) 384px,(max-width:640px) 640px"
	const criticalImages2 = [
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_256/v1707246278/earth_fnjwsd.webp 256w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_384/v1707246278/earth_fnjwsd.webp 384w",
		"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp 640w"
	]



	return (
		<HelmetProvider>
			<PreloadImages imgSrc={imgSrc} imageSources={criticalImages} imageSizes={imagesizes} priority />
			<PreloadImages imgSrc={imgSrc2} imageSources={criticalImages2} imageSizes={imagesizes2} priority />
			<main className='hero_section'>
				<div className="hero_image_wrapper">
					<picture>
						<source media="(max-width:256px)" srcSet={criticalImages[0]} sizes={imagesizes} />
						<source media="(max-width:480px)" srcSet={criticalImages[1]} sizes={imagesizes} />
						<source media="(max-width:640px)" srcSet={criticalImages[2]} sizes={imagesizes} />
						<source media="(max-width:750px)" srcSet={criticalImages[3]} sizes={imagesizes} />
						<source media="(max-width:828px)" srcSet={criticalImages[4]} sizes={imagesizes} />
						<source media="(max-width:1080px)" srcSet={criticalImages[5]} sizes={imagesizes} />
						<source media="(max-width:1200px)" srcSet={criticalImages[6]} sizes={imagesizes} />
						<img fetchpriority="high" decoding="async" loading="eager"
							src={imgSrc} alt="Hero_image"
							srcSet={criticalImages.join(", ")}
							sizes={imagesizes}
							width="100%"
							height='100%'
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
										alt='Earth illustration representing multilingualism'
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
									<Link className='des_link' to={`courses`}>
										{t("first_link")}
									</Link>
									<span>{t("after_des_link")}</span>
									<Link className='des_link' to={`pages/multilingualism`}>
										{t("second_link")}
									</Link>
									<span>{t("after_des_link2")}</span>
									<Link className='des_link' to={``}>
										{t("third_link")}
									</Link>
									<span>{t("last_des_link")}</span>
								</p>
							}
							<Link className='hero_btn change_direction' to={`about`}>
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
								<source media="(max-width:640px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp 640w" />
								<source media="(max-width:700px)" srcSet="https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_700/v1707246278/earth_fnjwsd.webp 700w" />
								<img
									fetchpriority="high"
									src={"https://res.cloudinary.com/dfnwjr7vo/image/upload/f_auto,w_640/v1707246278/earth_fnjwsd.webp"}
									alt='Earth illustration representing multilingualism'
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
		</HelmetProvider>
	);
};

export default Home;
