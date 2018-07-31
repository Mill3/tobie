import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Arrow extends Component {

  top() {
    return (
      <svg className={`${this.props.className} ${this.props.direction}`} width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
          <g id="Group" transform="translate(6.000000, 6.000000) rotate(-90.000000) translate(-6.000000, -6.000000) translate(0.000000, 1.000000)" stroke={`${this.props.color}`}>
            <polyline id="Line-Copy-2" points="6 0 11.2456678 5 6 9.97314045"></polyline>
            <path d="M10.5,5 L0.5,5" id="Line-Copy-2"></path>
          </g>
        </g>
      </svg>
    )
  }

  bottom() {
    return (
      <svg className={`${this.props.className} ${this.props.direction}`} width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
          <g id="Group" transform="translate(6.000000, 6.000000) rotate(-270.000000) translate(-6.000000, -6.000000) translate(0.000000, 1.000000)" stroke={`${this.props.color}`}>
            <polyline id="Line-Copy-2" points="6 0 11.2456678 5 6 9.97314045"></polyline>
            <path d="M10.5,5 L0.5,5" id="Line-Copy-2"></path>
          </g>
        </g>
      </svg>
    )
  }

  left() {
    return (
      <svg className={`${this.props.className} ${this.props.direction}`} width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
          <g id="Group" transform="translate(6.000000, 6.000000) rotate(-180.000000) translate(-6.000000, -6.000000) translate(0.000000, 1.000000)" stroke={`${this.props.color}`}>
            <polyline id="Line-Copy-2" points="6 0 11.2456678 5 6 9.97314045"></polyline>
            <path d="M10.5,5 L0.5,5" id="Line-Copy-2"></path>
          </g>
        </g>
      </svg>
    )
  }

  right() {
    return (
      <svg className={`${this.props.className} ${this.props.direction}`} width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
          <g id="Group" transform="translate(0.000000, 1.000000)" stroke={`${this.props.color}`}>
            <polyline id="Line-Copy-2" points="6 0 11.2456678 5 6 9.97314045"></polyline>
            <path d="M10.5,5 L0.5,5" id="Line-Copy-2"></path>
          </g>
        </g>
      </svg>
    )
  }

  render() {
    switch (this.props.direction) {
      case 'top':
        return this.top()
        break;
      case 'bottom':
        return this.bottom()
        break;
      case 'left':
        return this.left()
        break;
      case 'right':
        return this.right()
        break;
      default:
        return this.right()
        break;
    }
  }
}

Arrow.defaultProps = {
  direction: 'right',
  className: 'icn__arrow',
  color: '#000000'
}

export default Arrow;