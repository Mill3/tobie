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
import Seo from '@utils/Seo'

// styles
import styles from './landing.module.scss'

class Landing extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }    
  }

  componentDidMount() { 
       
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

  }
  
  render() { 
    return (
      <Layout location={this.props.location}>

        <Seo 
          title={this.props.data.site_options.title}
          description={this.props.data.site_options.description}
          image={this.props.data.site_options_acf.options.share_image ? this.props.data.site_options_acf.options.share_image.source_url : null}
          languageSlug={this.props.pageContext.language_slug}
        />

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
          <Projects data={this.props.data.projects} projectTypes={this.props.data.projectTypes} locale={this.props.LocaleState.locale} />          
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

    site_options : wordpressWpSettings {
      id
      description
      title
    }

    site_options_acf :  wordpressAcfOptions {
      options {
        dummy
        share_image {
          source_url
        }
      }
    }
    
    projects : allWordpressWpProjects {
      edges {
        node {
          title
          slug
          language_id
          language_slug
          project_types {
            term_id
            name
            slug
          }
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
