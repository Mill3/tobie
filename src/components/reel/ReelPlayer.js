import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scrollToElement from 'scroll-to-element'
import ReactPlayer from 'react-player'
import Fade from 'react-reveal/Fade'
import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react'

import SiteModal from '../base/modal'

import playSVG from '../../svg/play.svg'
import close from '../../svg/close.svg'

import styles from './reel.module.scss'

class ReelPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      labelText: 'Demo Reel',
      labelTextActive: 'Play Reel',
      src: this.props.video_preview_src,
      muted: true,
      playing: false,
      previewMode: true,
      positionStyle: {
        left: 0,
        top: 0,
      }
    }
    this.setPreviewMode = this.setPreviewMode.bind(this)
    this.setFullVideo = this.setFullVideo.bind(this)    
  }

  componentDidMount() {    
    if (this.refs.player !== undefined) {
      
      // start video after some timeout
      setTimeout(()=> {
        this.refs.player.play()
      }, 250);

      // when clicking in video
      this.refs.player.handleMouseDown = (event) => {
        event.preventDefault()
        return false
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {        
    if (prevProps.position.x !== this.props.position.x) {
      this.setState({
        labelText: 'Play Reel',
        positionStyle: {
          left: this.props.isActive ? this.props.position.x : null,
          top: this.props.isActive ? this.props.position.y : null
        }
      })
    } else if (prevProps.isActive && !this.props.isActive) {
      this.setState({
        labelText: 'Demo Reel',
        positionStyle: {
          left: "50%",
          top: "50%"
        }
      })
    }
  }

  setFullVideo(event) {
    event.preventDefault() 

    if (this.props.video_full_src) {
      this.setState({
        src: this.props.video_full_src,
        previewMode: false
      })
      this.refs.player.load()
      this.refs.player.play()
      this.refs.player.muted = false

      // get position
      // let positions = ReactDOM.findDOMNode(this.refs.player).getBoundingClientRect()
      // scroll to video
      // window.__scrollbar.scrollTo(0, positions.top, 1000)

      // scroll to video
      scrollToElement(ReactDOM.findDOMNode(this.refs.player), {
        duration: 1800,
        offset: 0,
        ease: 'inOutCirc'
      })

    }
  }

  setPreviewMode(event) {    
    event.preventDefault()
    this.setState({
      src: this.props.video_preview_src,
      muted: true,
      playing: false,
      previewMode: true,
    })

    this.refs.player.load()
    this.refs.player.play()
    this.refs.player.muted = false
  }

  render() { 
    return (
      <div className={
        classNames({
          [`${styles.reel}`]: this.state.previewMode,
          [`${styles.reel__playing}`]: !this.state.previewMode
        })
      }>

        {/* close button */}
        <a href="#" 
          onClick={(e) => this.setPreviewMode(e)}
          className={
            classNames({
              [`${styles.btn__close} fade-in`] : !this.state.previewMode,
              [`is-hidden`] : this.state.previewMode,
            })
          }
        >
          <img src={close} alt="X" />
        </a>

        {/* overlay with button and labels */}
        {this.state.previewMode &&
        <div className={styles.reel__overlay} onClick={(e) => this.setFullVideo(e)}>
          <span className={styles.reel__cursor} style={this.props.detectedEnvironment.isMouseDetected ? this.state.positionStyle : null }>
            <img alt="play icon" src={playSVG} />
          </span>
          <Fade bottom delay={250}>
            <h4 className={`${styles.reel__label} d-none d-md-block`}>
              <span>{this.state.labelText}</span>
            </h4>
          </Fade>
        </div>
        }

        {/* the player */}
        <Player
          ref="player"
          controls={!this.state.previewMode}
          muted={this.state.muted}
          playsInline
          loop={true}
          fluid={false}
          width='100%'
          height='100%'
          className={`${styles.video_react}`}
        >
          <source src={this.state.src} />
          <LoadingSpinner className="" />
          <BigPlayButton className="is-hidden" />
          <ControlBar autoHide={true} className={classNames({
            "is-hidden": this.state.previewMode
          })}/>
        </Player>

      </div>
    );
  }
}

ReelPlayer.propTypes = {
  video_preview_src: PropTypes.string.isRequired,
  video_full_src: PropTypes.string
}
 
export default ReelPlayer;