import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Modal from 'react-modal'

import styles from './modal.module.scss'

Modal.setAppElement(`#___gatsby`)

class SiteModal extends Component {

  render() {
    console.log(styles);
    
    return (
      <Modal className={
          classNames({
            [`${styles.modal__open}`]: this.props.isOpen,
            [`${styles.modal__closed}`]: !this.props.isOpen,
          })
        }
        overlayClassName={styles.modal__overlay}
        isOpen={this.props.isOpen}
      >
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