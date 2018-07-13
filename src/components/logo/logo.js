import React, { Component } from 'react';
import styles from './logo.module.scss'

class Logo extends Component {
  render() { 
    // console.log(styles);    
    return (
      <h1 className={styles.logo}>Tobie <span>Marier</span> Robitaille</h1>
    );
  }
}
 
export default Logo;