import React from "react"
import { Helmet } from "react-helmet"

const PageMeta = () => {


    return (
        <Helmet htmlAttributes={{ lang }}>
            <title>{title}</title>
            <meta name="description" content={description} />


            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content="Bindhash" />
    
           
            {/* <meta property="og:image" content="https://bindhash.in/images/og-preview.jpg" /> */}

          
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {/* <meta name="twitter:image" content="https://bindhash.in/images/twitter-card.jpg" /> */}
        </Helmet>

    )
}
export default PageMeta