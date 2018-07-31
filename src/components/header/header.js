import React from 'react';
import classNames from 'classnames'

import Nav from '@components/nav/nav'

import styles from './header.module.scss'

class Header extends React.Component {
  // state = {  }
  render() { 
    return (
      <header
        className={
          classNames({ 
            [`${styles.header}`]: !this.props.hidden,
            [`is-hidden`]: this.props.hidden
          })
        }
      >
        <Nav/>
      </header>
    );
  }
}

Header.propsDefault = {
  hidden: false
}
 
export default Header;