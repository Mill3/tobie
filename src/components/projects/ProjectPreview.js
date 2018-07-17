import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'gatsby'

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
        distance: "15%"
      }
    }
    
    return (
      <Wrapper {...attributes}>
        <article className={`${styles.project_preview} mb-5`}> 
          <Link to={`/fr/projects/${slug}`}>
            {(featured_media && featured_media.source_url) &&
            <figure className={`${styles.project_preview__preview_image}`}>
              <img src={featured_media.source_url} alt={title} className="img-fluid" />
            </figure>
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