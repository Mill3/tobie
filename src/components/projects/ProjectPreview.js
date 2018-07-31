import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'gatsby'

import FigureBox, { boxFormats } from '../figureBox/FigureBox'
import Play from '../../svg/Play'
import playSVG from '../../svg/play.svg'

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
    if (this.refs.video) {
      this.refs.video.play()
    }
  }

  pauseVideo() {
    if (this.refs.video) {
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
      video_preview_hover
    } = this.props.project.acf

    let Wrapper = "span"
    let attributes = null
    
    if (this.props.animate) {
      Wrapper = Fade
      attributes = {
        bottom: true,
        distance: "15%",
        delay: 350
      }
    }
    
    return (
      <Wrapper {...attributes}>
        <article 
          className={`${styles.project_preview} mb-5`}
          onMouseEnter={(e) => this.startVideo()}
          onMouseLeave={(e) => this.pauseVideo()}
        > 
          <Link to={`/fr/projects/${slug}`}>
            {(featured_media && featured_media.source_url) &&
              <FigureBox source={featured_media.source_url} format={boxFormats.sixteenByNine}>
                {video_preview_hover &&
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
                      <source src={video_preview_hover.source_url} />
                    </video>
                  </div>
                }
              </FigureBox>
            }
            <footer className={`${styles.project_preview__infos}`}>
              <div className={styles.project_preview__arrow}>
                <Play />
              </div>
              <h4 className="h2">
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