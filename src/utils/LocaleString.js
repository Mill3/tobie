import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const translations = {
  'en': {
    'Cinematographer' : 'Cinematographer',
    'Selected Work' : 'Selected Work',
    'Play Reel' : 'Play Reel',
    'selected_work_block' : 'Selected <span class="is-sans-serif d-block">Work</span>'
  },
  'fr': {
    'Cinematographer' : 'Directeur Photo',
    'Selected Work' : 'Projets Choisis',
    'Play Reel' : 'Jouer Démo',
    'selected_work_block' : 'Projets <span class="is-sans-serif d-block">Choisis</span>'
  }
}

export const GetString = (string) => {
  return translations[this.props.LocaleState.locale][this.props.string]
}

class LocaleString extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log(this.props.LocaleState.locale);
  }

  get() {
    try {
      return translations[this.props.LocaleState.locale][this.props.string]
    } catch (error) {
      return this.props.string
    }
  }

  render() { 
    return (
      <span dangerouslySetInnerHTML={{ __html : this.get() }} />
    );
  }
}

LocaleString.propTypes = {
  string: PropTypes.string.isRequired
}

// export default LocaleString
 
const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState
  }
}

export default connect(
  mapStateToProps,
  null
)(LocaleString)