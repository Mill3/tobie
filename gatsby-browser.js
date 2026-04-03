import React from 'react'
import { navigate } from 'gatsby'
import { Provider } from 'react-redux'

import createStoreMethod from './src/store'
import detectLocale from '@utils/detect-locale'

let store = createStoreMethod()

const ConnectedRootElement = ({ element }) => <Provider store={store}>{element}</Provider>

export const wrapRootElement = ConnectedRootElement

export const onInitialClientRender = () => {
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true

  const detectedLocale = detectLocale()

  store.dispatch({ type: 'SET_LOCALE', locale: detectedLocale })

  if (window.location.pathname === '/') {
    navigate(`/${detectedLocale}/`)
  }
}
