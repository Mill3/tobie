import React from 'react'
import { connect } from 'react-redux'
import { push } from 'gatsby'

import Layout from '@components/layout'
import detectLocale from '@utils/detect-locale'
import { setLocale } from '@reducers/actions'

// 
// this page is empty, should redirect to detected language landing page
// 

import styles from './index.module.scss'

class IndexPage extends React.Component {

  // detect and redirected to proper landing
  // componentDidMount() {
  //   // let detectedLocale = detectLocale();
  //   // this.props.setLocale(detectedLocale)
  //   setTimeout( () => {
  //     let to = `/${this.props.LocaleState.locale}/`
  //     console.log(to);
  //     // push(to)
  //   }, 250);
  // }

  // will never render, the sadness :(
  render() { 
    return (
      <Layout>
        <div className={styles.index} />
      </Layout>
    )
  }

}
 
const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState
  }
}

export default connect(
  mapStateToProps,
  null
)(IndexPage)
