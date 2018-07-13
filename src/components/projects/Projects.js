import React, { Component } from 'react';

import ProjectPreview from './ProjectPreview'

class Projects extends Component {
  
  list() {
    if (this.props.data && this.props.data.edges) {
      return this.props.data.edges.map((project, index) =>
        <ProjectPreview project={project.node} key={index} />
      )
    }
  }

  render() { 
    return (
      <section className={`container-fluid`}>
        <div className="row">
         
          {/* sidebar */}
          <aside className="col-12 col-md-4">
            <h3 className="h1">Selected <span className="is-sans-serif d-block">Work</span></h3>
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