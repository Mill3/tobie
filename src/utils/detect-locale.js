import indexOf from 'lodash/indexOf'
let getBrowserLanguage = null

if (typeof window !== `undefined`) {
  getBrowserLanguage = require('get-browser-language')
}

export const supportedLocales = ['en', 'fr']
export const defaultLocale = 'en'

const detectLocale = () => {
  
  if(getBrowserLanguage) {

    let languageCode = getBrowserLanguage().split('-')[0]

    // check if detected code supported
    // returns default if not found
    if( indexOf(supportedLocales, languageCode) > 0 ) {
      return languageCode
    } else {
      return defaultLocale
    }

  } else {
    return defaultLocale
  }

}

// module.exports = detectLocale

export default detectLocale
