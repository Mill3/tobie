import React from 'react'
import { connect } from 'react-redux'
import { push } from 'gatsby'

import detectLocale from '@utils/detect-locale'
import { setLocale } from '@reducers/actions'

// 
// this page is empty, should redirect to detected language landing page
// 

import styles from './index.module.scss'

class IndexPage extends React.Component {

  // detect and redirected to proper landing
  componentDidMount() {
    let detectedLocale = detectLocale();
    this.props.setLocale(detectedLocale)
  
    let to = `/${detectedLocale}/`
    setTimeout(function () {
      push(to)
    }, 250);
  }

  // will never render, the sadness :(
  render() { 
    return <div className={styles.index} />
  }

}
 
const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState,
    IntroState: store.IntroState
  }
}

export default connect(
  mapStateToProps,
  { setLocale }
)(IndexPage)
