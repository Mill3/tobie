import React from 'react';

class Play extends React.Component {

  render() {
    return (
      <svg className={this.props.className} width="28px" height="35px" viewBox="0 0 28 35" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="HOME_VF" transform="translate(-706.000000, -890.000000)" fill={this.props.color}>
                  <polygon id="Triangle" points="733.21589 907.354639 706 924.709279 706 890"></polygon>
              </g>
          </g>
      </svg>
    )
  }
}

Play.defaultProps = {
  className: 'icn__play',
  color: '#000000'
}

export default Play;