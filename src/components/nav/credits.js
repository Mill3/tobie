import React from 'react';
import { Scrambler } from "react-text-scrambler"
import LocaleString from '@utils/LocaleString'

import styles from './nav.module.scss'

class Credits extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  mouseEnter() {
    this.setState({
      hover: true
    })
    // console.log(this.state);
  }

  mouseLeave() {
    this.setState({
      hover: false
    })
  }

  render() { 
    return (
      <a 
        href="http://mill3.studio/"
        onMouseEnter={(e) => this.mouseEnter()}
        onMouseLeave={(e) => this.mouseLeave()}
        className={`${styles.navLink} ${styles.credits}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.state.hover &&
          <Scrambler duration={750} text="Mill3" />
        }
        {!this.state.hover &&
          <span><LocaleString string="Credits" /></span>
        }
      </a>
    );
  }
}
 
export default Credits;