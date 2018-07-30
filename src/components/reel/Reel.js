import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position'

// 
import ReelPlayer from './ReelPlayer'

class Reel extends Component {

  render() { 
    // console.log(this.props.data);
    return (
      <ReactCursorPosition>
        <ReelPlayer 
          video_preview_src={this.props.data.acf.video_preview ? this.props.data.acf.video_preview.source_url : null}
          video_full_src={this.props.data.acf.video_full ? this.props.data.acf.video_full.source_url : null}
          video_embed={this.props.data.acf.video_embed ? this.props.data.acf.video_embed : null}
        />
      </ReactCursorPosition>
    );
  }
}
 
export default Reel;