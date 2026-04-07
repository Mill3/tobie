import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'
import random from 'lodash/random'

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
      let localeProjects = this.props.data.edges.filter(e => e.node.language?.slug === this.props.locale)

      if (this.state.filterByProjectTypeID) {
        localeProjects = this.props.data.edges.filter(e => (e.node.projectTypes.nodes || [])[0]?.databaseId === this.state.filterByProjectTypeID)
      }

      // sort all projects by menuOrder field
      localeProjects = localeProjects.sort((a, b) => { return (a.node.menuOrder || 0) - (b.node.menuOrder || 0) });

      const findProjectType = (node) => {
        if(!node.projectTypes?.nodes) return null;
        const { databaseId } = (node.projectTypes.nodes || [])[0];
        const project_type = this.props.projectTypes && this.props.projectTypes.nodes
          ? this.props.projectTypes.nodes.filter((n => n.databaseId === databaseId))[0]
          : null;
        return project_type ? project_type : null;
      }

      return localeProjects.map((project, index) =>
        <ProjectPreview
          locale={this.props.locale}
          project={project.node}
          projectType={findProjectType(project.node)}
          key={random(0, 100000)}
          animate={true}
          index={index}
        />
      )
    }
  }

  projectTypesFilter() {
    let data = []

    const isActive = (ProjectTypeID) => {
      return ProjectTypeID === this.state.filterByProjectTypeID
    }

    if (this.props.projectTypes && this.props.projectTypes.nodes) {

      // reset link
      data.push(
        <a href="#" key={Math.random()} onClick={(e) => this.changeFilterSelection(e, null)} className={isActive(null) ? styles.projects__filters__link_active : null}>
          <LocaleString string='All' />
        </a>
      )

      // filter by languages
      let localeProjectTypes = this.props.projectTypes.nodes.filter(e => e.language?.slug === this.props.locale)

      localeProjectTypes.map((projectType, index) =>
        data.push(
          <a href="#" key={index} className={isActive(projectType.databaseId) ? styles.projects__filters__link_active : null} onClick={(e) => this.changeFilterSelection(e, projectType.databaseId)}>
            {projectType.name}
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
      <section id="projects-list" className={`container-fluid`}>
        <div className="row">

          {/* sidebar */}
          <aside className={`col-12 col-md-4 mb-4 is-relative ${styles.projects_sidebar}`}>
            <div className="is-sticky">
              <h3 className="h1">
                <Fade bottom={true} distance={"15%"} delay={250}>
                  <LocaleString string='selected_work_block' />
                </Fade>
              </h3>
              <Fade bottom={true} distance={"15%"} delay={450}>
                <nav className={styles.projects__filters}>
                  {this.projectTypesFilter()}
                </nav>
              </Fade>
            </div>
          </aside>

          {/* all work */}
          <aside className="col-12 col-md-8">
            <React.Fragment>
              {this.list()}
            </React.Fragment>
          </aside>

        </div>
      </section>
    );
  }
}

export default Projects;