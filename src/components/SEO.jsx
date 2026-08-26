import { Helmet } from "react-helmet-async";
import i18n from "../i18n";
export function SEO({
  title,
  description,
  path = "",
  image = "https://res.cloudinary.com/di24dufhu/image/upload/v1770300755/Mulinguae_1_mioi4d.jpg",
  keywords = "",
  type = "website",
  extra = null,
  ldJson = null,
}) {
  const url = `https://mulinguae.com/${i18n.language}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {ldJson && (
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      )}
      {extra}
    </Helmet>
  );
}
