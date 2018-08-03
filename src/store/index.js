import { createStore } from 'redux'

import reducer from '../reducers/index'

const createStoreMethod = () => createStore(reducer)

export default createStoreMethod