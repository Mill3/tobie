import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
// import { connect } from "react-redux"
import Scrollbar from 'smooth-scrollbar-react'
// import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';


// app components
import Main from './main'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

// import base style
import '../style/App.scss'

// favicons
import favicon from "../img/favicon.gif";

// css module
import styles from './layout.module.scss'

// class ScrollBarRef extends ScrollbarPlugin {
//   static pluginName = 'ScrollBarRef';

//   onInit() {
//     console.log('scroll has init');    
//   }

//   onUpdate() {
//     // console.log('scrollbar updated');
//     // this._update();
//   }
// }

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
        >
          <link rel="apple-touch-icon" href={favicon} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
        </Helmet>
        <div className={
          classNames({ 
              [`${styles.layout}`]: !inverted,
              [`${styles.layout__inverted}`]: inverted
            }
          )}
          style={{
            display: 'flex',
            height: '100vh'
          }}
          >
          <Scrollbar
            damping={0.03}
            renderByPixels={true}
            alwaysShowTracks={false}
          >
            <Header/>
            <Main location={location} children={children} isModal={isModal} />
            <Footer/>
          </Scrollbar>
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
