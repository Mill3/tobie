import React, { Component } from 'react';
import { push, graphql } from 'gatsby'
import ReactPlayer from 'react-player'

import styles from './projects.module.scss'

import Layout from '../layout'

class ProjectSingle extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      muted: true,
      volume: 0
    }
    // console.log(this.props.data);
    this.isModal = false
    this.startVideo = this.startVideo.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  componentDidMount() {
    setTimeout(()=> {
      this.startVideo() 
    }, 1000)
  }

  handleBack(event, isModal = false) {
    event.preventDefault()

    if (isModal) {
      window.history.back()
    } else {
      push('/')
    }
  }

  startVideo() {    
    if (this.refs.externalPlayer && this.isModal) {     
      this.setState({
        playing: true
      })
    }
  }

  render() { 
    // let isModal = false
    // We don't want to show the modal if a user navigates
    // directly to a post so if this code is running on Gatsby's
    // initial render then we don't show the modal, otherwise we
    // do.
    if (
      typeof window !== `undefined` &&
      window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE
    ) {
      this.isModal = true
    }
    
    return (
      <Layout location={this.props.location} isModal={this.isModal}>
        <article className={styles.project_single}>
          <h2>{this.props.data.project.title}</h2>
          { this.props.data.project.acf.video_embed &&
            <ReactPlayer
              ref="externalPlayer"
              url={this.props.data.project.acf.video_embed}
              width='100%'
              height='100%'
              autoPlay={true}
              muted={this.state.muted}
              volume={this.state.volume}
              playing={this.state.playing}
            />
          }
          <a href="/" onClick={(e) => this.handleBack(e, this.isModal)}>X</a>
        </article>
      </Layout>
    );
  }
}


export default ProjectSingle;

export const projectQuery = graphql`
query projectSingle($slug: String!) {
  project : wordpressWpProjects(slug : { eq: $slug }) {
    ...projectFragment
  }
}
`