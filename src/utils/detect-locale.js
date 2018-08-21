import indexOf from 'lodash/indexOf'
import filter from 'lodash/filter'
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

export const detectLocale = () => {
  // check if current location has a prefix
  let prefix = getPrefix()

  if (prefix) {
    return prefix
  } else {
    return defaultLocale
  }

}

export const alternateLocales = (currentLocale) => {
  // return currentLocale
  return filter(supportedLocales, function(l) {
    return l !== currentLocale;
  });  
}

export default detectLocale
