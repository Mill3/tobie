import indexOf from 'lodash/indexOf'
let getBrowserLanguage = null

if (typeof window !== `undefined`) {
  getBrowserLanguage = require('get-browser-language')
}

const supportedLanguages = ['en', 'fr']
const defaultLanguage = 'en'

const detectLocale = () => {
  // if(getBrowserLanguage) {

  //   let languageCode = getBrowserLanguage().split('-')[0]

  //   // check if detected code supported
  //   // returns default if not found
  //   if( indexOf(supportedLanguages, languageCode) > 0 ) {
  //     return languageCode
  //   } else {
  //     return defaultLanguage
  //   }

  // } else {
  //   return defaultLanguage
  // }

  return 'fr'

}

export const redirect = (to) => {
  window.history.pushState(null, null, to)
}

// module.exports = detectLocale

export default detectLocale
