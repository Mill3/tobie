import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scrollToElement from 'scroll-to-element'
import { Lazy } from 'react-lazy'
import { VideoTag } from 'react-video-tag'
import Fade from 'react-reveal/Fade'
import {
  isBrowser,
  isMobile
} from "react-device-detect";

import LocaleString from '@utils/LocaleString'

import playSVG from '../../svg/play.svg'
import close from '../../svg/close.svg'

import styles from './reel.module.scss'

class ReelPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.video_preview_src,
      muted: true,
      controls: false,
      playing: false,
      previewMode: true
    }
    this.setPreviewMode = this.setPreviewMode.bind(this)
    this.setFullVideo = this.setFullVideo.bind(this)
  }

  componentDidMount() {
    // handle exit
    let exitHandler = () => {
      let isFullScreen = !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement
      if (isFullScreen && !this.state.previewMode && isMobile) {
        this.setPreviewMode(null)
      }
    }

    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('webkitfullscreenchange', null);
    document.removeEventListener('mozfullscreenchange', null);
    document.removeEventListener('fullscreenchange', null);
    document.removeEventListener('MSFullscreenChange', null);
  }

  videoHasLoaded() {
    // set player DOM element in class
    // this.player = ReactDOM.findDOMNode(this.refs.playerContainer).getElementsByTagName('video')[0]
    // this.player = this.refs.player

    // console.log(this.refs.player, this.refs.player.requestFullscreen);

    // start video through a promise
    var promise = this.refs.player.play();

    this.refs.player.addEventListener("webkitendfullscreen", () => {
      if (!this.state.previewMode && isMobile) {
        this.setPreviewMode(null)
      }
    }, false);

    // promise won’t be defined in browsers that don't support promisified play()
    if (promise === undefined) {
      console.log('Promisified video play() not supported');
    } else {
      promise.then(() => {
        console.log('Video playback successfully initiated, returning a promise');
      }).catch(function(error) {
        console.log('Error initiating video playback: ', error);
      });
    }
  }

  setPreviewMode(event) {    
    if(event) event.preventDefault()
    this.setState({
      src: this.props.video_preview_src,
      muted: true,
      controls: false,
      playing: false,
      previewMode: true,
    })

    this.refs.player.load()
    this.refs.player.play()
  }

  setFullVideo(event) {
    if(event) event.preventDefault()

    if (this.props.video_full_src) {
      
      this.setState({
        src: this.props.video_full_src,
        previewMode: false,
        muted: false,
        controls: true
      })

      this.refs.player.load()
      this.refs.player.play()

      // get fullscreen method
      let videoDOM = ReactDOM.findDOMNode(this.refs.player)
      var requestFullScreen = videoDOM.requestFullscreen || videoDOM.msRequestFullscreen || videoDOM.mozRequestFullScreen || videoDOM.webkitRequestFullscreen || videoDOM.webkitEnterFullScreen
      
      // on mobile, toggle fullscreen
      if (isMobile) {
        requestFullScreen.call(videoDOM)  
      
      // scroll down on desktop
      } else {
        // scroll to video
        scrollToElement(ReactDOM.findDOMNode(this.refs.playerContainer), {
          duration: 1800,
          offset: 0,
          ease: 'inOutCirc'
        })
      }
    }
  }

  videoTransformStyle() {
    let baseOpacity = 1
    let coeficient = 2.75
    
    return {
      opacity: (this.state.previewMode && this.props.proximity) ? (baseOpacity - (this.props.proximity / coeficient)) : baseOpacity,
      height: "100%"
    }
  }

  lineTransformStyle() {
    return {
      transform: `scaleX(${this.props.proximity})`
    }
  }

  // videoAttributes() {
  //   let attributes = {}

  //   if (this.state.previewMode) {
  //     attributes.playsInline = true
  //   }

  //   return attributes
  // }

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
              [`${styles.btn__close} fade-in is-hidden`] : !this.state.previewMode,
              [`is-hidden`] : this.state.previewMode,
            })
          }
        >
          <img src={close} alt="X" />
        </a>

        {/* overlay with button and labels */}
        <div className={
            classNames({
              [`${styles.reel__overlay}`] : true,
              ['is-faded'] : !this.state.previewMode
            })
          }
          onClick={(e) => this.setFullVideo(e)}
        >
          <div className={styles.reel__overlay__inner} >
            {/* call to action with proximity detection */}
            <h4 ref={this.props.proximityRef} className={`${styles.reel__label}`}>
              <Fade bottom delay={350} distance={"50%"}>
                <div>
                  <img alt="play icon" src={playSVG} />
                  <span><LocaleString string='Play Reel' /></span>
                  <hr />
                </div>
              </Fade>
            </h4> 
          </div>
        </div>

        {/* the player */}
        <div ref="playerContainer" style={this.videoTransformStyle()} className={`${styles.reel__container}`}>
          <Lazy onLoad={() => this.videoHasLoaded()} cushion={'0% 0% 200% 0%'}>
            <video 
              ref="player"
              controls={this.state.controls}
              muted={this.state.muted}
              autoPlay
              loop
              allowFullScreen
              width='100%'
              height='100%'
              playsInline={this.state.previewMode}
              poster={this.props.video_poster_src}
            >
              <source src={this.state.src} />
            </video>
          </Lazy>
        </div>
      </div>
    );
  }
}

ReelPlayer.propTypes = {
  video_preview_src: PropTypes.string.isRequired,
  video_full_src: PropTypes.string
}
 
export default ReelPlayer;
