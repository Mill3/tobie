import React, { Component } from 'react';

import Nav from '@components/nav/nav'

import styles from './header.module.scss'

class Header extends Component {
  state = {  }
  render() { 
    return (
      <header className={styles.header}>
        <Nav/>
      </header>
    );
  }
}
 
export default Header;