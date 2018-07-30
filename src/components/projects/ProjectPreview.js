import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'gatsby'

import FigureBox, { boxFormats } from '../figureBox/FigureBox'

import styles from './projects.module.scss'

class ProjectPreview extends Component {
  
  render() { 
    
    let {
      title,
      slug,
      featured_media,
    } = this.props.project

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
        <article className={`${styles.project_preview} mb-5`}> 
          <Link to={`/fr/projects/${slug}`}>
            {(featured_media && featured_media.source_url) &&
              <FigureBox source={featured_media.source_url} format={boxFormats.sixteenByNine} />
            }
            <footer className={`${styles.project_preview__infos}`}>
              <h4 className="h2">{title}</h4>
            </footer>
          </Link>
        </article>
      </Wrapper>
    );
  }
}
 

export default ProjectPreview