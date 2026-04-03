import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position'
import ProximityFeedback from 'react-proximity-feedback'

import ReelPlayer from './ReelPlayer'

class Reel extends Component {

  render() {
    const acf = this.props.data?.acf || {}
    return (
      <ProximityFeedback throttleInMs={5} threshold={600}>
        {({ ref, proximity, props }) => (
          <div>
            <ReelPlayer
              video_preview_src={acf.text_video_preview ? acf.text_video_preview.source_url : null}
              video_full_src={acf.text_video_full ? acf.text_video_full.source_url : null}
              video_poster_src={acf.text_image ? acf.text_image.source_url : null}
              enable_reel_player={acf.enable_reel_player}
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