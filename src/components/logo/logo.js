import React, { Component } from 'react';


// styles
import styles from './logo.module.scss'

class Logo extends Component {

  className() {
    // return this.props.inverted ? styles.logo__inverted : styles.logo
    if (this.props.inverted) {
      return styles.logo__inverted
    } else if (this.props.compact) {
      return styles.logo__compact
    } else {
      return styles.logo
    }
  }

  render() { 
    return (
      <div className={this.className()}>
        <h1>Tobie <span>Marier</span> Robitaille</h1>
        {this.props.byLine &&
          <p className={styles.logo__byline}>Cinematographer</p>
        }
      </div>
    );
  }
}

Logo.propsDefault = {
  inverted: false,
  byLine: true,
  compact: false
}
 
export default Logo;