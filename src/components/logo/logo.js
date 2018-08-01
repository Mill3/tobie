import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'gatsby'

// styles
import styles from './logo.module.scss'

class Logo extends React.Component {

  render() {    

    // wrap with Div or Link depending on props
    let Wrapper = 'Div'
    let attributes = {}

    // Link to
    if (this.props.link) {
      Wrapper = Link
      attributes = {
        to: '/fr/'
      }
    }
    
    return (
      <Wrapper {...attributes} className={
        classNames({
          [`${styles.logo__inverted}`]: this.props.inverted,
          [`${styles.logo__animated}`]: this.props.animated,
          [`${styles.logo__compact}`]: this.props.compact
        })
      }>
        {/* base logo line */}
        <h1 className={
          classNames({
            [`fade-in`]: this.props.fadeIn,
            [`is-hidden`]: this.props.hidden
          })
        }>
          Tobie <span>Marier</span> Robitaille
        </h1>
        {/* byline */}
        {this.props.byLine &&
          <p className={
            classNames({
              [`${styles.byline}`] : !this.props.animated,
              [`${styles.byline__animated}`] : this.props.animated,
            })
            
          }>
            CSC – Cinematographer
          </p>
        }
      </Wrapper>
    );
  }
}

Logo.propsDefault = {
  inverted: false,
  animated: false,
  byLine: true,
  compact: false,
  link: false
}

Logo.propTypes = {
  inverted: PropTypes.bool,
  animated: PropTypes.bool,
  byLine: PropTypes.bool,
  link: PropTypes.bool
}
 
export default Logo;