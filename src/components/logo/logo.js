import React, { Component } from 'react';

// styles
import styles from './logo.module.scss'

class Logo extends Component {

  render() { 
    return (
      <div className={this.props.inverted ? styles.logo__inverted : styles.logo}>
        <h1>Tobie <span>Marier</span> Robitaille</h1>
        <p className={styles.logo__byline}>Cinematographer</p>
      </div>
    );
  }
}
 
export default Logo;