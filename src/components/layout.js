import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'

// app components
import Main from './main'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

import { setLocale } from '@reducers/actions'

import detectLocale from '@utils/detect-locale'

// import base style
import '../style/App.scss'

// favicons
import faviconOn from "../img/favicon.gif";
import faviconOff from "../img/favicon-off.gif";

// css module
import styles from './layout.module.scss'

const faviconStates = {
  on: faviconOn,
  off: faviconOff
}

let favicon = faviconStates.on

// const interval = setInterval( ()=> {
//   favicon = (favicon == faviconStates.on) ? faviconStates.off : faviconStates.on
// }, 2000)

const Layout = ({ children, location, inverted, hideHeader }) => (

  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        siteSettings: wordpressWpSettings {
          id
          title
          description
        }
        allPages: allWordpressPage {
          edges {
            node {
              id
              title
              slug
              language_id  
              language_slug 
              acf {
                show_in_nav
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.siteSettings.title}
          // description={data.siteSettings.description}
          meta={[
            { name: 'description', content: "data.siteSettings.description" }
          ]}
        >
          <link rel="apple-touch-icon" href={favicon} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <meta name="ahrefs-site-verification" content="60731af8a710220fa57373aeca408f14e0fb65e8dc1322d66fb4e2c5621f9da1">
        </Helmet>    
        <div className={
          classNames({ 
              [`${styles.layout}`]: !inverted,
              [`${styles.layout__inverted}`]: inverted
            }
          )}
        >
          <Header hidden={hideHeader} pages={data.allPages} />
          <Main location={location} children={children} />
          <Footer pages={data.allPages} />
        </div>
      </>
    )}
  />
)

Layout.defaultProps = {
  children: PropTypes.node.isRequired,
  hideHeader: false,
  inverted: false
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideHeader: PropTypes.bool,
  inverted: PropTypes.bool
}

export default Layout
