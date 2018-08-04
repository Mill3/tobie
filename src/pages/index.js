import React from 'react'

import Layout from '@components/layout'

// 
// this page is empty, should redirect to detected language landing page
// 

import styles from './index.module.scss'

class IndexPage extends React.Component {
  // will never render, the sadness :(
  render() { 
    return (
      <Layout>
        <div className={styles.index} />
      </Layout>
    )
  }
}

export default IndexPage
