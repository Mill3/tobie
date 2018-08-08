import React from 'react'

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
          title={this.props.data.site_options.title}
          description={this.props.data.site_options.description}
          image={this.props.data.site_options_acf.options.share_image ? this.props.data.site_options_acf.options.share_image.source_url : null}
        />
        <div className={styles.index} />
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query RootQuery {

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
  
  }
`;
