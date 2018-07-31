import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import Scrollbar from 'smooth-scrollbar';


// app components
import Main from './main'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'
import { isBrowser } from '@utils/browser'

// import base style
import '../style/App.scss'

// favicons
import favicon from "../img/favicon.gif";
// import favicon from "../img/favicon-off.gif";

// css module
import styles from './layout.module.scss'

class Wrapper extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {  }
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (isBrowser()) {
      window.__scrollbar = Scrollbar.init(ReactDOM.findDOMNode(this.ref.current))
    }
  }

  render() { 
    return (
      <div
        ref={this.ref}
        style={{
          display: 'block',
          height: '100vh'
        }}
      >
        {this.props.children}
      </div>
    )
  }

}
 
// export  Wrapper;

const Layout = ({ children, location, isModal, inverted, hideHeader }) => (
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
            { name: 'description', content: data.siteSettings.description }
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
        >
          <Header hidden={hideHeader} />
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
  hideHeader: false,
  inverted: false
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isModal: PropTypes.bool,
  hideHeader: PropTypes.bool,
  inverted: PropTypes.bool
}

export default Layout
