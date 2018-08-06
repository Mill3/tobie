import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'

import LocaleString from '@utils/LocaleString'

import styles from './projects.module.scss'

import ProjectPreview from './ProjectPreview'

class Projects extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterByProjectTypeID : null
    }
    this.changeFilterSelection = this.changeFilterSelection.bind(this)
  }
  
  list() {
    if (this.props.data && this.props.data.edges) {

      // filter by languages
      let localeProjects = this.props.data.edges.filter(e => e.node.language_slug === this.props.locale)      

      if (this.state.filterByProjectTypeID) {
        console.log(this.state.filterByProjectTypeID);
        
        localeProjects = this.props.data.edges.filter(e => e.node.project_types[0] === this.state.filterByProjectTypeID)      
      }

      return localeProjects.map((project, index) =>
        <ProjectPreview locale={this.props.locale} project={project.node} key={index} animate={this.props.animate} />
      )
    }
  }

  projectTypesFilter() {
    let data = []

    const isActive = (ProjectTypeID) => {
      return ProjectTypeID === this.state.filterByProjectTypeID
    }

    if (this.props.projectTypes && this.props.projectTypes.edges) {

      // reset link
      data.push(
        <a href="#" onClick={(e) => this.changeFilterSelection(e, null)} className={isActive(null) ? styles.projects__filters__link_active : null}>
          <LocaleString string='All' />
        </a>
      )

      // filter by languages
      let localeProjectTypes = this.props.projectTypes.edges.filter(e => e.node.language_slug === this.props.locale)      
      
      localeProjectTypes.map((projectType, index) =>
        data.push(
          <a href="#" key={index} className={isActive(projectType.node.wordpress_id) ? styles.projects__filters__link_active : null} onClick={(e) => this.changeFilterSelection(e, projectType.node.wordpress_id)}>
            {projectType.node.name}
          </a>
        )
      )
    }

    return data
  }
  
  changeFilterSelection(e, ProjectTypeID) {
    e.preventDefault()    
    this.setState({
      filterByProjectTypeID : ProjectTypeID
    })
  }

  render() { 
    // console.log(this.props);
    
    return (
      <section className={`container-fluid`}>
        <div className="row">
         
          {/* sidebar */}
          <aside className={`col-12 col-md-4 mb-4 is-relative ${styles.projects_sidebar}`}>
            <div className="is-sticky">
              <h3 className="h1">
                <Fade bottom={true} distance={"15%"} delay={250}>
                  <LocaleString string='selected_work_block' />
                </Fade>
              </h3>
              <nav className={styles.projects__filters}>
                {this.projectTypesFilter()}
              </nav>
            </div>
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