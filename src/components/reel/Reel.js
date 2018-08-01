import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position'

// 
import ReelPlayer from './ReelPlayer'

class Reel extends Component {

  render() { 
    return (
      <ReactCursorPosition>
        <ReelPlayer 
          video_preview_src={this.props.data.acf.text_video_preview ? this.props.data.acf.text_video_preview.source_url : null}
          video_full_src={this.props.data.acf.text_video_full ? this.props.data.acf.text_video_full.source_url : null}
        />
      </ReactCursorPosition>
    );
  }
}
 
export default Reel;