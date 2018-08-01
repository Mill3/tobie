import React from 'react'
import { push } from 'gatsby'
import detectLocale from '../utils/detect-locale'

// 
// this page is empty, should redirect to detected language landing page
// 

import styles from './index.module.scss'

class IndexPage extends React.Component {

  // detect and redirected to proper landing
  componentDidMount() {
    // let to = `/${detectLocale()}/`
    setTimeout(function () {
      push('/fr/')
    }, 1000);
  }

  // will never render, the sadness :(
  render() { 
    return <div className={styles.index} />
  }

}
 
export default IndexPage;