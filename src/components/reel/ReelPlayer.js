import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scrollToElement from 'scroll-to-element'
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
      playing: false,
      previewMode: true
    }
    this.setPreviewMode = this.setPreviewMode.bind(this)
    this.setFullVideo = this.setFullVideo.bind(this)    
  }

  componentDidMount() {    
    if (this.refs.player !== undefined) {
      
      // start video after some timeout
      // setTimeout(()=> {
      // }, 250);

      this.refs.player.play()

      // this.refs.player.video.handleCanPlayThrough = () => {
      //   // alert("Can play through video without stopping");
      //   
        
      //   // start video after some timeout if didn't started yet 
      //   setTimeout(()=> {
      //     this.refs.player.play()
      //   }, 2000);
      // };
      

      // when clicking in video
      this.refs.player.handleMouseDown = (event) => {
        event.preventDefault()
        return false
      }
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
    // this.refs.player.muted = true
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

      // scroll to video
      scrollToElement(ReactDOM.findDOMNode(this.refs.player), {
        duration: 1800,
        offset: 0,
        ease: 'inOutCirc'
      })

    }
  }

  videoTransformStyle() {
    // console.log(this.props.proximity);
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
        {/* {this.state.previewMode && */}
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
        {/* } */}

        {/* the player */}
        <div style={this.videoTransformStyle()} className={`${styles.reel__container}`}>
          <video
            ref="player"
            controls={!this.state.previewMode}
            autoPlay={true}
            muted={this.state.muted}
            playsInline
            loop={true}
            width='100%'
            height='100%'
          >
            <source src={this.state.src} />
          </video>
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