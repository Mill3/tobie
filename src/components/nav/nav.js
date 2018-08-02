import React from 'react';
import { Link } from 'gatsby'

import Credits from './credits'
// import { detectLocale } from '@utils/detect-locale'

import styles from './nav.module.scss'

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language : 'fr'
    }
  }

  componentDidMount() {    
    // let language = detectLocale()
    this.setState({
      language: 'fr'
    })
  }

  pages() {
    let data = []
    
    if (this.props.pages && this.props.pages.edges) {
      
      // filter only pages for current locale
      let localePages = this.props.pages.edges.filter(e => e.node.language_slug === this.state.language)
      console.log(localePages);
      
      
      // loop found pages
      localePages.map((page, index) => {
        data.push(
          <li className={`${styles.navItem}`}>
            <Link 
              to={`/${this.state.language}/${page.node.slug}/`}
              exact={true}
              activeClassName={`${styles.navLink__active}`}
              className={`${styles.navLink}`}>
                <span dangerouslySetInnerHTML={{ __html: page.node.title }} />
            </Link>
          </li>
        )
      })
    }

    return data
  }

  render() {    
    
    return (
      <nav className={`${styles.nav} d-flex`}>
        <ul className='nav ml-md-auto'>
          <li className={`${styles.navItem}`}>
          <Link 
              to={`/${this.state.language}/`}
              exact={true}
              activeClassName={`${styles.navLink__active}`}
              className={`${styles.navLink}`}>
                Selected Work
            </Link>
          </li>
          {this.pages()}

          {/* language switch */}
          <li className={`${styles.navItem}`}>
            <Link to={`/en/`} className={`${styles.navLink}`}>En</Link>
          </li>

          {/* credits */}
          {this.props.credits &&
          <li className={`${styles.navItem}`}>
            <Credits />
          </li>
          }
        </ul>
      </nav>
    );
  }
}

Nav.defaultProps = {
  credits: false,
  pages: null
}

export default Nav;