import React, { Component } from 'react'
import { push } from 'gatsby'
import detectLocale from '../utils/detect-locale'

// 
// this page is empty, should redirect to detected language landing page
// 

class IndexPage extends Component {

  // detect and redirected to proper landing
  componentDidMount() {
    let to = `/${detectLocale()}/`
    push(to)
  }

  // will never render, the sadness :(
  render() { 
    return null
  }

}
 
export default IndexPage;