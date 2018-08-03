

const IntroState = (state = initialIntroState, action) => {
  if (action && action.type === `HAD_INTRO`) {
    return {
      played: true
    }
  } else {
    return initialIntroState
  }
  // switch (action.type) {
  //   case 'HAD_INTRO':
      
  //     break
  //   default:
  //     return state
  //     break
  // }
}

const initialIntroState = { played: false }

export default IntroState