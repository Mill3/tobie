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
};

Main.propTypes = {
  children: PropTypes.object.isRequired,
};
 
export default Main;