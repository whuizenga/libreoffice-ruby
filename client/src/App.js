import React, { Component } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    text: 'Hello World!',
    data: null,
    url: null,
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const params = {...this.state}

    axios.post('http://localhost:3002/api/documents', params)
      .then(() => {
        axios.get('http://localhost:3002/api/documents/1', { responseType: 'arraybuffer' })
          .then((response) => {
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
            console.log(url)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            // link.click();
            this.setState({
              url,
              // data: response.data,
            })
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

        <div className="pdf-display">
          <object data={this.state.url} tpye="application/pdf">
            <embed src={this.state.url} type="application/pdf"/>
          </object>
        </div>

        {/* <div>
          <iframe src={this.state.data} type="application/pdf" title="generated pdf" />
        </div>

        <Document
          file={this.state.data}
        >
          <Page pageNumber={1}/>
        </Document> */}
      </div>
    )
  }
}

export default App
