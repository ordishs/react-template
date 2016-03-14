import React from 'react'
import axios from 'axios'
import Country from './components/Country.jsx'
require('./css/app.css')

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.onGetClick = this.onGetClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onPostClick = this.onPostClick.bind(this)

    this.state = {
      filter: '',
      countries: [],
      postData: `
      {
        "id": 4,
        "name": "Italy"
      }
      `
    }
  }

  onGetClick (e) {
    let url = '/api/countries'
    if (this.state.filter) {
      url += '/' + this.state.filter
    }
    axios.get(url).then((response) => {
      this.setState({countries: response.data})
    }).catch((response) => {
      console.log(response)
    })
  }

  onPostClick (e) {
    // Parse this to an object so Axios will treat it as JSON...
    const payload = JSON.parse(this.state.postData)

    axios.post('/api/countries', payload)
    .then((response) => {
      console.log(response)
    })
    .catch((response) => {
      console.log(response)
    })
  }

  onInputChange (e) {
    this.setState({
      filter: e.target.value
    })
  }

  onTextAreaChange (e) {
    this.setState({
      postData: e.target.value
    })
  }

  render () {
    const textAreaStyle = {
      height: '200px'
    }

    return (
      <div>

        <ul>
          {this.state.countries.map((country) => {
            return <Country key={country.id} name={country.name} />
          })}
        </ul>

        <input onChange={this.onInputChange} value={this.state.filter} placeholder='Enter id or leave blank for all' />
        <button onClick={this.onGetClick}>Get All</button>

        <textarea
          style={textAreaStyle}
          onChange={this.onTextAreaChange}
          value={this.state.postData}>
        </textarea>

        <button onClick={this.onPostClick}>Post</button>

      </div>
    )
  }
}
