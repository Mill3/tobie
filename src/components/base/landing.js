import React, { Component } from 'react'
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
  
  render() { 
    return (
      <Layout>
        <section className={`${styles.landing}`}>          
          
          <header className={`${styles.landing__header}`}>
            <Logo inverted={true} />
          </header>
          
          <div className="mb-6">
            <Reel data={this.props.data.homeVideo} />
          </div>
          
          {/* all projects */}
          <Projects data={this.props.data.projects} />          
        </section>
      </Layout>
    );
  }

}
 
export default Landing

export const query = graphql`
  query IndexQuery($language_slug: String!) {
    
    projects : allWordpressWpProjects(filter : { language_slug : { eq: $language_slug }}) {
      edges {
        node {
          ...projectFragment
        }
      }
    }

    homeVideo : wordpressWpTexts(slug : { eq: "home-video" }) {
      ...textFragment
    }

  }
`;
