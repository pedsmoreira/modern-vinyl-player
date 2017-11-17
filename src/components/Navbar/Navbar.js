// @flow

import React from "react";
import { observer } from "mobx-react";

import "./Navbar.scss";

@observer
export default class Navbar extends React.Component<*> {
  render() {
    if (this.props.for) return this.props.render();

    return (
      <div className="Navbar">
        <div className="container">Navbar</div>
      </div>
    );
  }
}
