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
          title={this.props.data.site_options?.generalSettings?.title}
          description={this.props.data.site_options?.generalSettings?.description}
          image={null}
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
            <Reel data={null} />
          </div>

          {/* all projects */}
          <Projects data={this.props.data.projects} projectTypes={null} locale={this.props.LocaleState.locale} />
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

    site_options: wp {
      generalSettings {
        title
        description
      }
    }

    projects: allWpProject {
      edges {
        node {
          title
          slug
          language {
            slug
            code
          }
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          projectDetails {
            videoEmbed
            hover {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }

  }
`;
