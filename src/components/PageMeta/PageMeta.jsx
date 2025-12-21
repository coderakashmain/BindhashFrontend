import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://bindhash.xyz";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-default.png`;

const PageMeta = ({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  lang = "en",
}) => {
  const location = useLocation();
  const canonicalUrl = SITE_URL + location.pathname;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* BASIC SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ROBOTS */}
      <meta name="robots" content="index, follow" />

      {/* OPEN GRAPH */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Bindhash" />
      <meta property="og:image" content={image} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default PageMeta;
