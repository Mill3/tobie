
const IntroState = (state = initialIntroState, action) => {
  switch (action.type) {
    case 'HAD_INTRO':
      return {
        played: true
      }
      break
    default:
      return state
      break
  }
}

const initialIntroState = { played: false }

export default IntroState