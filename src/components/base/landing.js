import React, { Component } from 'react'
import { graphql } from 'gatsby'

// load app components
import Layout from '@components/layout'
import Logo from '@components/logo/logo'

// styles
import styles from './landing.module.scss'

class Landing extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
    console.log(this.props, styles)
  }

  render() { 
    return (
      <Layout>
        <section className={`${styles.landing}`}>          
          <header className={styles.landing__header}>
            <Logo inverted={true} />
            {/* this is the landing header */}
          </header>
          <h2>this is the landing page</h2>
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
          id
          title
          slug
          language_slug
        }
      }
    }
  }
`;
