import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position'
import ProximityFeedback from 'react-proximity-feedback'

import ReelPlayer from './ReelPlayer'

class Reel extends Component {

  render() {
    const texts = this.props.data?.texts || {}
    return (
      <ProximityFeedback throttleInMs={5} threshold={600}>
        {({ ref, proximity, props }) => (
          <div>
            <ReelPlayer
              video_preview_src={texts.textVideoPreview?.node?.sourceUrl || null}
              video_full_src={texts.textVideoFull?.node?.sourceUrl || null}
              video_poster_src={texts.textImage?.node?.sourceUrl || null}
              enable_reel_player={texts.enableReelPlayer || false}
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