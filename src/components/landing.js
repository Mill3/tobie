import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Layout from './layout'

class Landing extends Component {
  
  constructor(props) {
    super(props)
    this.state = {  }
    console.log(this.props)
  }

  render() { 
    return (
      <Layout>
        <section className="container">
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
