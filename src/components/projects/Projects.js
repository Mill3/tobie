import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'

import LocaleString from '@utils/LocaleString'

import styles from './projects.module.scss'

import ProjectPreview from './ProjectPreview'

class Projects extends Component {
  
  list() {
    if (this.props.data && this.props.data.edges) {
      return this.props.data.edges.map((project, index) =>
        <ProjectPreview locale={this.props.locale} project={project.node} key={index} animate={this.props.animate} />
      )
    }
  }

  render() { 
    return (
      <section className={`container-fluid`}>
        <div className="row">
         
          {/* sidebar */}
          <aside className={`col-12 col-md-4 mb-4 is-relative ${styles.projects_sidebar}`}>
            <h3 className="h1 is-sticky">
              <Fade bottom={true} distance={"15%"} delay={250}>
                <LocaleString string='selected_work_block' />
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