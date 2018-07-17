import React, { Component } from 'react';
import classNames from 'classnames'

// styles
import styles from './logo.module.scss'

class Logo extends Component {

  render() {     
    return (
      <div className={
        classNames(
          {
            [`${styles.logo__inverted}`]: this.props.inverted,
            [`${styles.logo__animated}`]: this.props.animated,
            [`${styles.logo__compact}`]: this.props.compact
          }
        )
      }>
        <h1>Tobie <span>Marier</span> Robitaille</h1>
        {this.props.byLine &&
          <p className={styles.byline}>Cinematographer</p>
        }
      </div>
    );
  }
}

Logo.propsDefault = {
  inverted: false,
  animated: false,
  byLine: true,
  compact: false
}
 
export default Logo;