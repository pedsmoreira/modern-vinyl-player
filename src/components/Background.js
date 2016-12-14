import React from "react";

import "./Background.scss"

export default class Background extends React.Component {
  render() {
    if (!this.props.image) return null

    return (
      <div className="background animated fadeIn">
        <div className="background_image" style={{backgroundImage: `url('${this.props.image}')`}}/>
      </div>
    )
  }
}
