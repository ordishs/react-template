import React from 'react'

export default class Country extends React.Component {

  render () {
    return (
      <li>{this.props.name}</li>
    )
  }
}

Country.propTypes = {
  name: React.PropTypes.string.isRequired
}
