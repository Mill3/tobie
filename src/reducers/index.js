import { createStore as reduxCreateStore } from "redux"

const IntroState = (state, action) => {
  if (action.type === `HAD_INTRO`) {
    return {
      introPlayed: true
    }
  }
  return state
}

const initialIntroState = { introPlayed: false }

const createStore = () => reduxCreateStore(IntroState, initialIntroState)

export default createStore