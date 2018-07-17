import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SiteModal from './base/modal'
import { Link, PageRenderer } from "gatsby"

class Main extends Component {

  render() { 
    const { location, isModal } = this.props
    
    if (isModal && SiteModal) {
      return (
        <React.Fragment>
          {/* <PageRenderer location={{ pathname: location.pathname }} /> */}
          <SiteModal isOpen={true} location={location}>
            {this.props.children}
          </SiteModal>
        </React.Fragment>
      )
    }

    return (
      <main>
        {this.props.children}
      </main>
    );
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