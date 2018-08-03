import { defaultLocale, supportedLocales } from '../utils/detect-locale'

const LocaleState = (state = initialLocaleState, action) => {
  if (action && action.type === `SET_LOCALE`) {
    return {
      locale: action.locale
    }
  } else {
    return initialLocaleState
  }
  // switch (action.type) {
  //   case 'SET_LOCALE':
      
  //     break
  //   default:
  //     return state
  //     break
  // }
}

const initialLocaleState = { locale: defaultLocale }

export default LocaleState