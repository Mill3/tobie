import React, { Component } from 'react';

// styles
import styles from './logo.module.scss'

class Logo extends Component {

  render() { 
    return (
      <h1 className={this.props.inverted ? styles.logo__inverted : styles.logo}>Tobie <span>Marier</span> Robitaille</h1>
    );
  }
}
 
export default Logo;