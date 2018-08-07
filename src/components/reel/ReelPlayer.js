import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scrollToElement from 'scroll-to-element'
import { Lazy } from 'react-lazy'
import { VideoTag } from 'react-video-tag'
// import ReactPlayer from 'react-player'
import Fade from 'react-reveal/Fade'
// import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react'

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
    this.player = null
    // console.log(this.props);
    
  }

  videoHasLoaded() {
    // set player DOM element in class
    this.player = ReactDOM.findDOMNode(this.refs.playerContainer).getElementsByTagName('video')[0]

    // start video through a promise
    var promise = this.player.play();

    // promise won’t be defined in browsers that don't support promisified play()
    if (promise === undefined) {
      console.log('Promisified video play() not supported');
    } else {
      promise.then(function() {
        console.log('Video playback successfully initiated, returning a promise');
      }).catch(function(error) {
        console.log('Error initiating video playback: ', error);
      });
    }
  }

  setPreviewMode(event) {   
     
    event.preventDefault()
    this.setState({
      src: this.props.video_preview_src,
      muted: true,
      controls: false,
      playing: false,
      previewMode: true,
    })

    this.player.load()
    this.player.play()
  }

  setFullVideo(event) {
    event.preventDefault()     

    if (this.props.video_full_src) {
      
      this.setState({
        src: this.props.video_full_src,
        previewMode: false,
        muted: false,
        controls: true
      })

      this.player.load()
      this.player.play()
      // this.player.requestFullscreen()
      console.log(this.player);
      

      // scroll to video
      scrollToElement(ReactDOM.findDOMNode(this.refs.playerContainer), {
        duration: 1800,
        offset: 0,
        ease: 'inOutCirc'
      })

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
            <VideoTag 
              src={this.state.src}
              controls={this.state.controls}
              muted={this.state.muted}
              autoPlay
              playsInline
              loop
              width='100%'
              height='100%'
            />
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