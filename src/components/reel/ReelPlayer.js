import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scrollToElement from 'scroll-to-element'
import ReactPlayer from 'react-player'
import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react'

import SiteModal from '../base/modal'

import playSVG from '../../svg/play.svg'

import styles from './reel.module.scss'

class ReelPlayer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      labelText: 'Play reel',
      src: this.props.video_preview_src,
      muted: true,
      playing: false,
      preview: true,
      openModal: false,
      positionStyle: {
        left: 0,
        top: 0,
      }
    }
    this.startVideo = this.startVideo.bind(this)
    this.setFullVideo = this.setFullVideo.bind(this)
    console.log(playSVG);
    
  }

  componentDidMount() {
    if (this.refs.player !== undefined) {
      this.refs.player.play()

      // when clicking in video
      this.refs.player.handleMouseDown = (event) => {
        event.preventDefault()
        return false
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {    
    // console.log(this.props.isActive);
    
    if (prevProps.position.x != this.props.position.x) {
      this.setState({
        positionStyle: {
          left: this.props.isActive ? this.props.position.x : null,
          top: this.props.isActive ? this.props.position.y : null
        }
      })
    } else if (prevProps.isActive && !this.props.isActive) {
      this.setState({
        positionStyle: {
          left: "50%",
          top: "50%"
        }
      })
    }
  }

  setFullVideo(event) {
    event.preventDefault() 
    // this.openModal()
    if (this.props.video_full_src && !this.props.video_embed) {
      this.setState({
        src: this.props.video_full_src,
        preview: false
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

  openModal() {
    this.refs.player.pause()
    this.setState({
      playing: true,
      openModal: true
    })
  }

  closeModal() {
    this.refs.player.play()
    this.setState({
      playing: false,
      openModal: false
    })
  }

  startVideo() {    
    if (this.refs.externalPlayer) {
      this.setState({
        playing: true
      })
    }
  }

  render() { 
    return (
      <div className={
        classNames({
          [`${styles.reel}`]: this.state.preview,
          [`${styles.reel__playing}`]: !this.state.preview
        })
      }>
        {/* if has video_emebed  */}
        {this.props.video_embed &&
          <SiteModal isOpen={this.state.openModal}>
            <ReactPlayer
              ref="externalPlayer"
              url={this.props.video_embed}
              width='100%'
              height='100%'
              autoPlay={true}
              fluid={false}
              playing={this.state.playing}
              onStart={() => this.startVideo()}
            />
            <button onClick={(e) => this.closeModal()}>Close modal</button>
          </SiteModal>
        }
        {this.state.preview &&
        <div className={styles.reel__overlay} onClick={(e) => this.setFullVideo(e)}>
          <span className={styles.reel__cursor} style={this.props.detectedEnvironment.isMouseDetected ? this.state.positionStyle : null }>
            <img src={playSVG} />
          </span>
          <h4 className={styles.reel__label}>{this.state.labelText}</h4>
        </div>
        }
        <Player
          ref="player"
          controls={!this.state.preview}
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
          <ControlBar autoHide={false} className={classNames({
            "is-hidden": this.state.preview
          })}/>
        </Player>
      </div>
    );
  }
}

ReelPlayer.propTypes = {
  video_preview_src: PropTypes.string.isRequired,
  video_full_src: PropTypes.string,
  video_embed: PropTypes.string
}
 
export default ReelPlayer;