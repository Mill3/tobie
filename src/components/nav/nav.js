import React, { Component } from 'react';
import { Link } from 'gatsby'

import detectLocale from '@utils/detect-locale'

import styles from './nav.module.scss'

class Nav extends Component {
  render() { 
    return (
      <nav className={`${styles.nav} d-flex`}>
        <ul className='nav ml-auto'>
          <li className='nav-item'><Link to={`/${detectLocale()}/`} className='nav-link'>Home</Link></li>
          <li className='nav-item'><Link to={`/${detectLocale()}/a-propos/`} className='nav-link'>About & Infos</Link></li>
          <li className='nav-item'><Link to={`/en/`} className='nav-link'>English</Link></li>
        </ul>
      </nav>
    );
  }
}
 

export default Nav;