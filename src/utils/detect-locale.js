import indexOf from 'lodash/indexOf'
let getBrowserLanguage = null

if (typeof window !== `undefined`) {
  getBrowserLanguage = require('get-browser-language')
}

export const supportedLocales = ['en', 'fr']
export const defaultLocale = 'en'

const getPrefix = () => {
  let parts = window.location.pathname.split('/')
  if (parts.length > 0) {
    return parts[1]
  } else {
    return false
  }
}

const detectLocale = () => {
  // check if current location has a prefix
  let prefix = getPrefix()

  // no prefix, detect language
  if(!prefix && getBrowserLanguage) {

    let languageCode = getBrowserLanguage().split('-')[0]

    // check if detected code supported
    // returns default if not found
    if( indexOf(supportedLocales, languageCode) > 0 ) {
      return languageCode
    } else {
      return defaultLocale
    }

  // has prefix, return this
  } else if (prefix) {
    return prefix

  // nothing else, return default
  } else {
    return defaultLocale
  }

}

// module.exports = detectLocale

export default detectLocale
