import { Helmet } from "react-helmet-async";

const PreloadImages = ({
  imgSrc,
  imageSources,
  imageSizes,
  priority = false,
}) => (
  <Helmet>
    <link
      rel="preconnect"
      href="https://res.cloudinary.com"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      as="image"
      href={imgSrc}
      imageSrcSet={imageSources.join(",")}
      imageSizes={imageSizes}
      fetchpriority={priority ? "high" : "low"}
    />
  </Helmet>
);

export default PreloadImages;
