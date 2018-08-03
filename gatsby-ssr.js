import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import createStoreMethod from './src/store'

let store = createStoreMethod()

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => (
    <Provider store={store}>
      {bodyComponent}
    </Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody/>))
}