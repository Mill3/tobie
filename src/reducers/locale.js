import { defaultLocale, supportedLocales } from '../utils/detect-locale'

const LocaleState = (state = initialLocaleState, action) => {  
  switch (action.type) {
    case 'SET_LOCALE':
      return {
        locale: action.locale
      }
      break
    default:
      return state
      break
  }
}

const initialLocaleState = { locale: defaultLocale }

export default LocaleState