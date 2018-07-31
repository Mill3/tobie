import React, { Component } from 'react';
import classNames from 'classnames'

// styles
import styles from './logo.module.scss'

class Logo extends Component {

  render() {     
    return (
      <div className={
        classNames({
          [`${styles.logo__inverted}`]: this.props.inverted,
          [`${styles.logo__animated}`]: this.props.animated,
          [`${styles.logo__compact}`]: this.props.compact
        })
      }>
        {/* base logo line */}
        <h1>Tobie <span>Marier</span> Robitaille</h1>
        {/* byline */}
        {this.props.byLine &&
          <p className={
            classNames({
              [`${styles.byline}`] : !this.props.animated,
              [`${styles.byline__animated}`] : this.props.animated,
            })
            
          }>
            Cinematographer
          </p>
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