import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    text: 'Hello World!'
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const params = {...this.state}

    axios.post('http://localhost:3002/api/documents', params)
      .then((data) => {
        console.log({ data })
        this.setState({
          data,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Replacement Text:</label>
          <input
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>

        <iframe src={this.state.data} title="document"/>
      </div>
    )
  }
}

export default App
