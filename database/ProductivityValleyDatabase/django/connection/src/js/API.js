import axios from 'axios'
import React from 'react'

export default class API extends React.Component
{
  state = { details: [], }

  componentDidMount(){

    let data;
    axios.get('http://localhost:8000')
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err => {'Data not retrieved'})
  }

  render(){
    return(
      <div>
        <header>Data from Django </header>
        <hr></hr>
        {this.state.details.map((output, id) => (
          <div key={id}>
            <div> 
              <h2>{output.firstName}</h2>
              <h3>{output.lastName}</h3>
              <h3>{output.username}</h3>
              <h3>{output.email}</h3>
              <h3>{output.money}</h3>
            </div>
          </div>
        ))}
      </div>
    )
  }
}