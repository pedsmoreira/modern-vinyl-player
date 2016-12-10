import React from 'react'
import {FormControl} from 'react-bootstrap'

export default class SearchMenu extends React.Component {
  search(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <FormControl placeholder="What are you looking for?" onChange={this.search}/>
    )
  }
}
