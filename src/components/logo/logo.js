import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'gatsby'

import LocaleString from '@utils/LocaleString'

import { hadIntro } from '@reducers/actions'

// styles
import styles from './logo.module.scss'

class Logo extends React.Component {
  
  componentDidMount() {
    if (this.props.animated) {
      // get timeout delay from variables in SCSS module exports
      let timeoutAfter = parseInt(styles.logoAnimationDuration) + parseInt(styles.logoAnimationDelay)
      setTimeout( ()=> {
        this.props.hadIntro()
      }, timeoutAfter); 
    }
  }

  render() {    

    // wrap with Div or Link depending on props
    let Wrapper = 'Div'
    let attributes = {}

    // Link to
    if (this.props.link) {
      Wrapper = Link
      attributes = {
        to: `/${this.props.LocaleState.locale}/`
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
          Tobie <span>Marier</span> Robitaille <span className={styles.logo__title}>CSC</span>
        </h1>
        {/* byline */}
        {this.props.byLine &&
          <p className={
            classNames({
              [`${styles.byline}`] : !this.props.animated,
              [`${styles.byline__animated}`] : this.props.animated,
            })
            
          }>
            <LocaleString string='Cinematographer' />
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

const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState,
  }
}

export default connect(
  mapStateToProps,
  { hadIntro }
)(Logo)