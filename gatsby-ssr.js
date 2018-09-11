import React from 'react'
import { Provider } from 'react-redux'

import createStoreMethod from './src/store'

let store = createStoreMethod()

const ConnectedRootElement = ({ element }) => <Provider store={store}>{element}</Provider>

export const wrapRootElement = ConnectedRootElement