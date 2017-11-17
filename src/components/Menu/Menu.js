// @flow

import React from "react";
import { observer } from "mobx-react";

import "./Menu.scss";

@observer
export default class Menu extends React.Component<*> {
  render() {
    return <div className="Menu">Select an album to play</div>;
  }
}
