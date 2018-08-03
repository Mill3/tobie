import React from 'react';
import { Link, push } from 'gatsby'
import { connect } from 'react-redux'

import Credits from './credits'
import LocaleString from '@utils/LocaleString'
import { detectLocale, supportedLocales } from '@utils/detect-locale'
import { setLocale } from '@reducers/actions'

import styles from './nav.module.scss'

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.goToLanguage = this.goToLanguage.bind(this)
  }

  goToLanguage(event, locale) {
    event.preventDefault()

    // set new locale
    this.props.setLocale(locale)

    // then change path
    let to = `/${locale}/`
    push(to)
  }

  languages() {
    let data = []

    supportedLocales.map((language, index) => {
      if (language !== this.props.LocaleState.locale) {
        data.push(
          <li key={index} className={`${styles.navItem}`}>
            <a href={`/${language}/`} className={`${styles.navLink}`} onClick={(event) => this.goToLanguage(event, language)}>
              {language}
            </a>
          </li>
        )
      }
    })

    return data
  }

  pages() {
    let data = []
    
    if (this.props.pages && this.props.pages.edges) {
      
      // filter only pages for current locale
      let localePages = this.props.pages.edges.filter(e => e.node.language_slug === this.props.LocaleState.locale)      
      
      // loop found pages
      localePages.map((page, index) => {
        data.push(
          <li key={index} className={`${styles.navItem}`}>
            <Link 
              to={`/${this.props.LocaleState.locale}/${page.node.slug}/`}
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
              to={`/${this.props.LocaleState.locale}/`}
              exact={true}
              activeClassName={`${styles.navLink__active}`}
              className={`${styles.navLink}`}>
                <LocaleString string={'Selected Work'} />
            </Link>
          </li>

          {/* list all pages */}
          {this.pages()}

          {/* language switch */}
          {this.languages()}

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

const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState
  }
}

export default connect(
  mapStateToProps,
  { setLocale }
)(Nav)
