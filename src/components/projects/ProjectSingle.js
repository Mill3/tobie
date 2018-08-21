import React, { Component } from 'react';
import { push, graphql } from 'gatsby'
import ReactPlayer from 'react-player'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import styles from './projects.module.scss'

import Layout from '../layout'
import Logo from '../logo/logo'
import Seo from '@utils/Seo'

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
  }

  componentDidMount() {
    setTimeout(()=> {
      this.startVideo() 
    }, 1000)
  }

  handleBack(event, isModal = false) {
    event.preventDefault()
    // console.log(isModal);
    

    if (window.history.state) {
      window.history.back()
    } else {
      push(`/${this.props.LocaleState.locale}/`)
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
    return (
      <Layout location={this.props.location} hideHeader={true} inverted={true}>

        <Seo 
          title={this.props.data.project.yoast_meta ? this.props.data.project.yoast_meta.yoast_wpseo_title : this.props.data.project.title}
          description={this.props.data.project.yoast_meta ? this.props.data.project.yoast_meta.yoast_wpseo_metadesc : null}
          image={this.props.data.project.featured_media ? this.props.data.project.featured_media.source_url : null}
          languageSlug={this.props.pageContext.language_slug}
        />

        <div className="container-fluid">
          
          <article className={`${styles.project_single}`}>         

              <header className={`row align-items-center ${styles.project_single__header}`}>
                <aside className="col-12 col-sm-6 mb-3">
                  <Logo inverted={true} compact={true} link={true} />
                </aside>
                <aside className="col-10 col-sm-auto ml-sm-auto">
                  <h4 className="is-sans-serif">{this.props.data.project.title}</h4>
                </aside>
                <nav className="col-auto order-1">
                  <a href="/" className={styles.btn__close} onClick={(e) => this.handleBack(e, this.isModal)}>
                    <img src={close} alt="X" />
                  </a>
                </nav>
              </header>

              <div className={`${styles.project_single__content}`}>

                  {this.props.data.project.acf.video_embed &&
                    <ReactPlayer
                      ref="externalPlayer"
                      url={this.props.data.project.acf.video_embed}
                      width='100%'
                      height='100%'
                      autoPlay={true}
                      playing={this.state.playing}
                      controls={true}
                      className={''}
                      config={{
                        youtube: {
                          playerVars: { showinfo: 0 }
                        }
                      }}
                    />
                  } 
                
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

const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState,
  }
}

export default connect(
  mapStateToProps,
  null
)(ProjectSingle)

export const projectQuery = graphql`
query projectSingle($slug: String!) {
  project : wordpressWpProjects(slug : { eq: $slug }) {
    id
    title
    slug
    content
    featured_media {
      source_url
    }
    yoast_meta {
      yoast_wpseo_title
      yoast_wpseo_metadesc
      yoast_wpseo_canonical
    }
    acf {
      video_embed
    }
  }
}
`