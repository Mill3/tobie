import { createStore } from 'redux'

// stores
import rootReducer from '../reducers'

// create root store for provider
export const store = createStore(rootReducer)