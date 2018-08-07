import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'gatsby'
import {
  isBrowser,
  isMobile
} from "react-device-detect";

import FigureBox, { boxFormats } from '../figureBox/FigureBox'
import Play from '../../svg/Play'

import styles from './projects.module.scss'

class ProjectPreview extends Component {
  
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.startVideo = this.startVideo.bind(this)
    this.pauseVideo = this.pauseVideo.bind(this)
  }

  componentDidMount() {    
    this.setState({
      title: this.props.project.title
    })
  }

  startVideo() {
    if (this.refs.video && isBrowser) {
      this.refs.video.currentTime = 0;
      this.refs.video.play(0)
    }
  }

  pauseVideo() {
    if (this.refs.video && isBrowser) {
      this.refs.video.pause()
    }
  }

  render() { 
  
    let {
      title,
      slug,
      featured_media
    } = this.props.project

    let {
      hover
    } = this.props.project.acf

    let Wrapper = "span"
    let attributes = null
    
    if (this.props.animate) {
      Wrapper = Fade
      attributes = {
        bottom: true,
        distance: "15%",
        delay: 150 * this.props.index
      }
    }
    
    return (
      <Wrapper {...attributes}>
        <article 
          className={`${styles.project_preview} mb-5`}
          onMouseEnter={(e) => this.startVideo()}
          onMouseLeave={(e) => this.pauseVideo()}
        > 
          <Link to={`/${this.props.locale}/projects/${slug}`}>
            {(featured_media && featured_media.source_url) &&
              <FigureBox source={featured_media.source_url} format={boxFormats.sixteenByNine}>
                {(hover && isBrowser) &&
                  <div className={styles.project_preview__video_preview}>
                    <video
                      ref='video'
                      width='100%'
                      height='100%'
                      playsInline
                      autoPlay
                      muted
                      loop
                    >
                      <source src={hover.source_url} />
                    </video>
                  </div>
                }
              </FigureBox>
            }
            <footer className={`${styles.project_preview__infos}`}>
              <div className={styles.project_preview__arrow}>
                <Play />
              </div>
              <h4 className={styles.project_preview__title}>
                <span>{title}</span>
              </h4>
            </footer>
          </Link>
        </article>
      </Wrapper>
    );
  }
}
 

export default ProjectPreview