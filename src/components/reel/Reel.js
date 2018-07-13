import React, { Component } from 'react';
import { Player } from 'video-react'

class Reel extends Component {
  
  componentDidMount() {
    this.refs.player.play()
  }

  render() { 
    // console.log(this.props);    
    return (
      <div>
        {this.props.data.acf.video &&
          <Player
            ref="player"
            controls={false}
            muted={true}
            preload={'auto'}
            playsInline
            fluid={true}
            loop={true}
            src={this.props.data.acf.video.source_url}
          />
        }
      </div>
    );
  }
}
 
export default Reel;