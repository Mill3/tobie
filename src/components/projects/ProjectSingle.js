import React, { Component } from 'react';
import { push, graphql } from 'gatsby'
import ReactPlayer from 'react-player'

import styles from './projects.module.scss'

import Layout from '../layout'
import Logo from '../logo/logo'

import close from '../../svg/close.svg'

class ProjectSingle extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      muted: true,
      volume: 0
    }
    this.isModal = false
    this.startVideo = this.startVideo.bind(this)
    this.handleBack = this.handleBack.bind(this)
    console.log(this.props.data);
    
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
      <Layout location={this.props.location} isModal={false} hideHeader={true} inverted={true}>

        <div className="container-fluid">
          
          <article className={`${styles.project_single}`}>         

              <header className={`row align-items-center ${styles.project_single__header}`}>
                <aside className="col-6">
                  <Logo inverted={true} compact={true} link={true} />
                </aside>
                <aside className="col-auto ml-auto">
                  <h4 className="is-sans-serif">{this.props.data.project.title}</h4>
                </aside>
                <nav className="col-auto">
                  <a href="/" className={styles.btn__close} onClick={(e) => this.handleBack(e, this.isModal)}>
                    <img src={close} alt="X" />
                  </a>
                </nav>
              </header>

              <div className={`${styles.project_single__content} row`}>

                <div className="col">
                
                  {this.props.data.project.acf.video_embed &&
                    <ReactPlayer
                      ref="externalPlayer"
                      url={this.props.data.project.acf.video_embed}
                      width='100%'
                      height='100%'
                      autoPlay={true}
                      playing={this.state.playing}
                      controls={true}
                      className={'col'}
                      config={{
                        youtube: {
                          playerVars: { showinfo: 0 }
                        }
                      }}
                    />
                  } 

                </div>
                
              </div>

              {this.props.data.project.content &&
              <footer className={`${styles.project_single__footer} row`}>
                <div className="entry col-12" dangerouslySetInnerHTML={{ __html: this.props.data.project.content }} />
              </footer>
              }

          </article>

        </div>

      </Layout>
    );
  }
}


export default ProjectSingle;

export const projectQuery = graphql`
query projectSingle($slug: String!) {
  project : wordpressWpProjects(slug : { eq: $slug }) {
    id
    title
    slug
    content
    featured_media {
      id
      media_type
      source_url
    }
    acf {
      video_embed
    }
  }
}
`