import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactPlayer from 'react-player'
import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react'

import SiteModal from '../base/modal'

import styles from './reel.module.scss'

class ReelPlayer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      labelText: 'Play reel',
      src: this.props.video_preview_src,
      muted: true,
      preview: true,
      openModal: false,
      positionStyle: {
        left: 0,
        top: 0,
      }
    }
  }

  componentDidMount() {
    if (this.refs.player !== undefined) {
      this.refs.player.play()

      // when clicking in video
      this.refs.player.handleMouseDown = (event) => {
        // event.preventDefault()
        if (event.type == 'mousedown') {
          this.handleMouseDown(event)
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {    
    if (prevProps.position.x != this.props.position.x) {
      this.setState({
        positionStyle: {
          left: this.props.position.x,
          top: this.props.position.y,
        }
      })
    }
  }

  handleMouseDown(event) {
    event.preventDefault() 
    this.openModal()
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

  // startModalVideo(event) {
  //   // console.log(this.refs.externalPlayer);
  //   // this.refs.externalPlayer.props.playing = true;
  //   setTimeout(()=> {
  //     // this.refs.externalPlayer.player.player.setVolume(1);
  //     console.log(this.refs.externalPlayer.player.player);
  //     this.refs.externalPlayer.player.player.seekTo(1)
  //     // this.refs.externalPlayer.player.player.play()

  //     this.setState({
  //       playing: true
  //       // openModal: true
  //     })
      
  //     // this.refs.externalPlayer.player.player.play()
  //   }, 1000)
  // }

  render() { 
    return (
      <div className={styles.reel}>
        <SiteModal isOpen={this.state.openModal}>
          <ReactPlayer
            ref="externalPlayer"
            url={this.props.video_embed}
            width='100%'
            height='100%'
            muted={this.state.playing}
            volume={1}
            playing={this.state.playing}
          />
          <button onClick={(e) => this.closeModal()}>Close modal</button>
        </SiteModal>
        <span className={styles.reel__cursor} style={this.props.detectedEnvironment.isMouseDetected ? this.state.positionStyle : null }>{this.state.labelText}</span>
        <Player
          ref="player"
          controls={false}
          muted={this.state.muted}
          preload={'auto'}
          playsInline
          loop={true}
          fluid={true}
          src={this.state.src}
        >
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
  video_embed: PropTypes.string.isRequired,
}
 
export default ReelPlayer;