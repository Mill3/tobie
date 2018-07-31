import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Lazy } from 'react-lazy'

import styles from './figureBox.module.scss'

// if (typeof window !== `undefined`) {
//   const intersectionObserver = require('intersection-observer')
// }

export const boxFormats = {
  none: 'box__none',
  auto: 'box__auto',
  fullscreen: 'box__fullscreen',
  default: 'box__default',
  square: 'box__square',
  half: 'box__half',
  sixteenByNine: 'box__sixteen_nine',
  superScope: 'box__super_scope',
  postalCard: 'box__postal_card',
  portrait: 'box__portrait'
}

class FigureBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingClassName: 'is-loading'
    }
    // console.log(styles, this.props.format, styles[this.props.format]);
  }

  backgroundStyle() {
    if (this.props.type === 'background') {
      return {
        backgroundImage: `url("${this.props.source}")`,
        backgroundSize: this.props.backgroundSize,
        backgroundPosition: this.props.backgroundPosition,
        backgroundRepeat: 'no-repeat',
        height: "100%"
      }
    }
  }

  imageBackground() {
    if (this.props.type === 'background') {
      return (
        <div style={this.backgroundStyle()} />
      )
    }
  }


  imageInline() {
    if (this.props.type === 'inline') {
      return (
        <img src={this.props.source} alt={'alt'} className="img-fluid" />
      )
    }
  }

  contentHasLoaded() {
    this.setState({
      loadingClassName: 'has-loaded'
    })
  }

  render() {
    const TagName = this.props.tagName
    // console.log(this.props.source);
    
    return (
      <TagName className={`${styles[this.props.format]} ${this.props.type} ${this.props.className} ${this.state.loadingClassName}`}>
        {this.props.children}
        <Lazy onLoad={() => this.contentHasLoaded() } cushion={'0% 0% 200% 0%'} className={styles.content}>
          {/* <img src={this.props.source.src} sizes="(min-width: 768px) 50vw, (min-width: 1024px) 66vw, 100vw" srcSet={`${this.props.source.srcSet}`} /> */}
          {this.imageBackground()}
          {this.imageInline()}
        </Lazy>
        {this.props.caption &&
          <figcation><p>{this.props.caption}</p></figcation>
        }
      </TagName>
    )
  }
}

FigureBox.defaultProps = {
  format: boxFormats.default,
  type: 'background',
  tagName: 'picture',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  caption: null,
  className: null
}

FigureBox.propTypes = {
  type: PropTypes.oneOf(['background', 'inline']),
  source: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
};

export default FigureBox;