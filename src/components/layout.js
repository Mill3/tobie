import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import { connect } from "react-redux"

// app components
import Main from './main'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

// import base style
import '../style/App.scss'

// css module
import styles from './layout.module.scss'

const Layout = ({ children, location, isModal, inverted }) => (
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
        <div className={
          classNames(
            { 
              [`${styles.layout}`]: !inverted,
              [`${styles.layout__inverted}`]: inverted
            }
          )
          }>
          <Header/>
          <Main location={location} children={children} isModal={isModal} />
          <Footer/>
        </div>
      </>
    )}
  />
)

Layout.defaultProps = {
  children: PropTypes.node.isRequired,
  isModal: false,
  inverted: false
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isModal: PropTypes.bool,
  inverted: PropTypes.bool
}

export default Layout
