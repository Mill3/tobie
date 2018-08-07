import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position'
import ProximityFeedback from 'react-proximity-feedback'

import ReelPlayer from './ReelPlayer'

class Reel extends Component {

  render() { 
    return (
      <ProximityFeedback throttleInMs={5} threshold={600}>
        {({ ref, proximity, props }) => (
          <div>
            <ReelPlayer 
              video_preview_src={this.props.data.acf.text_video_preview ? this.props.data.acf.text_video_preview.source_url : null}
              video_full_src={this.props.data.acf.text_video_full ? this.props.data.acf.text_video_full.source_url : null}
              video_poster_src={this.props.data.acf.text_image ? this.props.data.acf.text_image.source_url : null}
              proximityRef={ref}
              proximity={proximity}
            />
          </div>
        )}
      </ProximityFeedback>  
    );
  }
}
 
export default Reel;