import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import styles from './modal.module.scss'

Modal.setAppElement(`#___gatsby`)

class SiteModal extends Component {
  
  constructor(props) {
    super(props)
    this.state = {  }
    console.log(this.props);
    
  }

  render() {
    return (
      <Modal className={styles.modal} overlayClassName={styles.modal__overlay} isOpen={this.props.isOpen}>
        {this.props.children}
      </Modal>
    );
  }
}
 
SiteModal.defaultProps = {
  children: null,
  isOpen: false
}

SiteModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool
}


export default SiteModal