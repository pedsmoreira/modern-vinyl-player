import React from "react";

import {Icon} from "react-fa";

import "./Loader.scss"

export default class Loader extends React.Component {
  render() {
    return <div className="loader" style={{padding: '1rem'}}>
      <Icon name="spinner" pulse/>
      <span className="loader_text">{this.props.text}</span>
    </div>
  }
}
