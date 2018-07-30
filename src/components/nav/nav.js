import React, { Component } from 'react';
import { Link } from 'gatsby'

import detectLocale from '@utils/detect-locale'

import styles from './nav.module.scss'

class Nav extends Component {
  render() {    
    return (
      <nav className={`${styles.nav} d-flex`}>
        <ul className='nav ml-auto'>
          <li className={`${styles.navItem}`}>
          <Link 
              to={`/${detectLocale()}/`}
              exact={true}
              activeClassName={`${styles.navLink__active}`}
              className={`${styles.navLink}`}>
                Selected Work
            </Link>
          </li>
          <li className={`${styles.navItem}`}>
            <Link 
              to={`/${detectLocale()}/a-propos/`}
              exact={true}
              activeClassName={`${styles.navLink__active}`}
              className={`${styles.navLink}`}>
                About & Infos
              </Link>
            </li>
          <li className={`${styles.navItem}`}>
            <Link to={`/en/`} className={`${styles.navLink}`}>En</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
 

export default Nav;