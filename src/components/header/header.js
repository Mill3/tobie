import React from 'react';
import classNames from 'classnames'

import Nav from '@components/nav/nav'

import styles from './header.module.scss'

class Header extends React.Component {
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
        <Nav pages={this.props.pages} />
      </header>
    );
  }
}

Header.propsDefault = {
  hidden: false,
  pages: null
}
 
export default Header;