import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@components/layout'
import Seo from '@utils/Seo'

// 
// this page is empty, should redirect to detected language landing page
// 

import styles from './index.module.scss'

class IndexPage extends React.Component {
  // will never render, the sadness :(
  render() { 
    return (
      <Layout>
        <Seo
          title={this.props.data.site_options?.generalSettings?.title}
          description={this.props.data.site_options?.generalSettings?.description}
          image={null}
        />
        <div className={styles.index} />
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query RootQuery {

    site_options: wp {
      generalSettings {
        title
        description
      }
    }

  }
`;
