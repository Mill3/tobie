import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Seo = (props) => {

  const siteName = 'Tobie Marier Robitaille csc'
  const siteDescription = 'Cinematographer - Directeur photo'
  const sep = '|'

  const defaultTitle = () => {
    return `${siteName} ${sep} ${siteDescription}`
  }

  const title = () => {
    if (props.title) {
      return props.title
    } else {
      return defaultTitle()
    }
  }

  const description = () => {
    if (props.description) {
        return props.description
    } else {      
      return siteDescription
    }
  }

  const image = () => {        
    if(props.image) {
      return props.image
    }
  }

  return(
    <Helmet
      defaultTitle={`${defaultTitle()}`}
      title={title()}
    >
      <meta name="description" content={description()} />
      {/* facebook */}
      <meta property="og:title" content={title()} />
      <meta property="og:description" content={description()} />
      <meta property="og:image" content={image()} />
      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title()} />
      <meta name="twitter:description" content={description()} />
      <meta name="twitter:image" content={image()} />
    </Helmet>
  )
}

Seo.defaultProps = {
  title: null
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

export default Seo