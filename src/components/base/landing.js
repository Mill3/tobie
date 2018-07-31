import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'

// load app components
import Layout from '@components/layout'
import Logo from '@components/logo/logo'

// components
import Reel from '@components/reel/Reel'
import Projects from '@components/projects/Projects'

// styles
import styles from './landing.module.scss'


class Landing extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
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
              [`${styles.landing}`]: this.props.introPlayed,
              [`${styles.landing__withIntro}`]: !this.props.introPlayed
            }
          )
        }>
          <header className={`${styles.landing__header}`}>
            <Logo 
              byLine={true}
              inverted={!this.props.introPlayed ? false : true}
              animated={this.props.introPlayed ? false : true}
            />
          </header>
          
          <div className="mb-6">
            <Reel data={this.props.data.homeVideo} />
          </div>
          
          {/* all projects */}
          <Projects data={this.props.data.projects} animate={!this.props.introPlayed} />          
        </section>
      </Layout>
    );
  }

}

const mapStateToProps = ({ introPlayed }) => {
  return { introPlayed }
}

const mapDispatchToProps = dispatch => {
  return { hadIntro: () => dispatch({ type: `HAD_INTRO` }) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)


export const query = graphql`
  query IndexQuery {
    
    projects : allWordpressWpProjects {
      edges {
        node {
          title
          slug
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
      }
    }

  }
`;
