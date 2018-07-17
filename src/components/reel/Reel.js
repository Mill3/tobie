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
          video_preview_src={this.props.data.acf.video_preview.source_url}
          video_embed={this.props.data.acf.video_embed}
        />
      </ReactCursorPosition>
    );
  }
}
 
export default Reel;