import React from "react";
import { Helmet } from "react-helmet";

const PageMeta = ({ title, description, lang = "en" }) => {
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="Bindhash" />

      {/* Optional preview image (recommended!) */}
      {/* <meta property="og:image" content="https://bindhash.xyz/your-image.jpg" /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content="https://bindhash.xyz/your-image.jpg" /> */}
    </Helmet>
  );
};

export default PageMeta;
