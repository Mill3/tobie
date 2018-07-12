import getBrowserLanguage from 'get-browser-language'
import indexOf from 'lodash/indexOf'

const supportedLanguages = ['en', 'fr']
const defaultLanguage = 'en'

const detectLocale = () => {
  let languageCode = getBrowserLanguage().split('-')[0]

  // check if detected code supported
  // returns default if not found
  if( indexOf(supportedLanguages, languageCode) > 0 ) {
    return languageCode
  } else {
    return defaultLanguage
  }
}

export const redirect = (to) => {
  window.history.pushState(null, null, to)
}

// module.exports = detectLocale

export default detectLocale
