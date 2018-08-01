import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './layout.module.scss'

class Main extends Component {

  render() { 
    return (
      <main className={styles.main}>
        {this.props.children}
      </main>
    )
  }
}

Main.defaultProps = {
  children: null,
  isModal: false
};

Main.propTypes = {
  children: PropTypes.object.isRequired,
  isModal: PropTypes.bool
};
 
export default Main;