import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

// load app components
import Layout from '@components/layout'
import Logo from '@components/logo/logo'

import { hadIntro } from '@reducers/actions'

// components
import Reel from '@components/reel/Reel'
import Projects from '@components/projects/Projects'

// styles
import styles from './landing.module.scss'

class Landing extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }    
    console.log(this.props.data);
    // set SEO data
    // console.log(this.props.LocaleState);
    // this.front_page = 
  }

  componentDidMount() { 

    // pick seo data
       
    if (this.props.IntroState.played) {

      this.setState({
        isReady: true
      })
      
    } else {

      setTimeout( ()=> {
        this.setState({
          isReady: true
        })
      }, 100);

    }

    // force had intro after a few seconds
    setTimeout( ()=> {
      this.props.hadIntro()
    }, 4000); 
  }

  componentWillUnmount() {
    this.props.hadIntro()
  }
  
  render() { 
    return (
      <Layout location={this.props.location}>
        <section className={
          classNames(
            { 
              [`${styles.landing}`]: this.props.IntroState.played,
              [`${styles.landing__withIntro}`]: !this.props.IntroState.played
            }
          )
        }>
          <header className={`${styles.landing__header}`}>
              <Logo 
                byLine={true}
                inverted={!this.props.IntroState.played ? false : true}
                animated={this.props.IntroState.played ? false : true}
                fadeIn={this.props.IntroState.played ? false : true}
                hidden={!this.state.isReady}
              />
          </header>
          
          <div className="mb-6">
            <Reel data={this.props.data.homeVideo} />
          </div>
          
          {/* all projects */}
          <Projects data={this.props.data.projects} projectTypes={this.props.data.projectTypes} locale={this.props.LocaleState.locale} animate={!this.props.IntroState.played} />          
        </section>
      </Layout>
    );
  }

}

const mapStateToProps = store => {
  return {
    IntroState: store.IntroState,
    LocaleState: store.LocaleState,
  }
}

export default connect(
  mapStateToProps,
  { hadIntro }
)(Landing)


export const query = graphql`
  query IndexQuery {

    page_en : wordpressPage(slug : { eq: "home" }) {
      ...pageFragment
    }

    page_fr : wordpressPage(slug : { eq: "accueil" }) {
      ...pageFragment
    }
    
    projects : allWordpressWpProjects {
      edges {
        node {
          title
          slug
          language_id
          language_slug
          project_types
          featured_media {
            id
            media_type
            source_url
          }
          acf {
            video_embed
            hover {
              source_url
            }
          }
        }
      }
    }

    projectTypes : allWordpressWpProjectTypes {
      edges {
        node {
          id
          wordpress_id
          name
          slug
          language_id
          language_slug
        }
      }
    }

    homeVideo : wordpressWpTexts(slug : { eq: "home-video" }) {
      slug
      title
      acf {
        text_video_preview {
          source_url
        }
        text_video_full {
          source_url
        }
        text_image {
          source_url
        }
      }
    }

  }
`;
