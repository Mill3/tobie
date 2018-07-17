import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { connect } from "react-redux"

// app components
import Main from './main'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

// import base style
import '../style/App.scss'

const Layout = ({ children, location, isModal }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        siteSettings: wordpressWpSettings {
          id
          title
          description
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.siteSettings.title}
          meta={[
            { name: 'description', content: data.siteSettings.description },
          ]}
        />
        <Header/>
        <Main location={location} children={children} isModal={isModal} />
        <Footer/>
      </>
    )}
  />
)

Layout.defaultProps = {
  children: PropTypes.node.isRequired,
  isModal: false
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isModal: PropTypes.bool
}

export default Layout
