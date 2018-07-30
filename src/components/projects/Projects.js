import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'

import styles from './projects.module.scss'

import ProjectPreview from './ProjectPreview'

class Projects extends Component {
  
  list() {
    if (this.props.data && this.props.data.edges) {
      return this.props.data.edges.map((project, index) =>
        <ProjectPreview project={project.node} key={index} animate={this.props.animate} />
      )
    }
  }

  render() { 
    return (
      <section className={`container-fluid`}>
        <div className="row">
         
          {/* sidebar */}
          <aside className={`col-12 col-md-4 is-relative ${styles.projects_sidebar}`}>
            <h3 className="h1 is-sticky">
              <Fade bottom={true} distance={"15%"} delay={250}>
                Selected <span className="is-sans-serif d-block">Work</span>
              </Fade>
            </h3>
          </aside>

          {/* all work */}
          <aside className="col-12 col-md-8">
            {this.list()}
          </aside>

        </div>
      </section>
    );
  }
}
 
export default Projects;