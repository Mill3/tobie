import React from 'react';
import { Link, push } from 'gatsby'
import { connect } from 'react-redux'
import scrollToElement from 'scroll-to-element'

import Credits from './credits'
import LocaleString from '@utils/LocaleString'
import { detectLocale, supportedLocales } from '@utils/detect-locale'
import { setLocale } from '@reducers/actions'

import styles from './nav.module.scss'

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.goToLanguage = this.goToLanguage.bind(this)
    this.scrollToProjects = this.scrollToProjects.bind(this)
  }

  goToLanguage(event, locale) {
    event.preventDefault()

    // set new locale
    this.props.setLocale(locale)

    // then change path
    let to = `/${locale}/`
    push(to)
  }

  isActive = (match, location) => {
    // console.log(match, location, 'is it ?',  match.path === location.pathname);
    if (match && location) {
      return match.url === location.pathname
    } else {
      return null
    }
  }
  
  scrollToProjects(e) {    
    scrollToElement(document.getElementById('projects-list'), {
      duration: 1000,
      offset: -50,
      ease: 'inOutCirc'
    })
  }

  root() {
    let data = []

    supportedLocales.map((language, index) => {
      if (language == this.props.LocaleState.locale) {
        data.push(
          <li key={index} className={`${styles.navItem}`}>
            <Link 
              to={`/${language}/`}
              exact
              // isActive={this.isActive}
              className={`${styles.navLink} d-none d-md-block`} 
              activeClassName={`${styles.navLink__active} d-none d-md-block`}
              onClick={(e) => this.scrollToProjects(e)}
            >
              <LocaleString string={'Selected Work'} />
            </Link>
          </li>
        )
      }
    })

    return data
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

      // only in with option : show_in_nav
      localePages = localePages.filter(e => e.node.acf.show_in_nav === true)            
      
      // loop filtered pages
      localePages.map((page, index) => {
        data.push(
          <li key={index} className={`${styles.navItem}`}>
            <Link 
              to={`/${this.props.LocaleState.locale}/${page.node.slug}/`}
              exact
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
        <ul className='nav ml-auto'>

          {/* root url */}
          {(!this.props.credits && !this.props.social) &&
            this.root()
          }

          {/* list all pages */}
          {(!this.props.credits && !this.props.social) &&
            this.pages()
          }

          {/* language switch */}
          {this.languages()}

          {/* socials links */}
          {this.props.social &&
          <li className={`${styles.navItem}`}>
            <a href="https://www.instagram.com/tobie_marier_robitaille/" className={`${styles.navLink}`}  target="_blank">Instagram</a>
          </li>
          }

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
  social: false,
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
