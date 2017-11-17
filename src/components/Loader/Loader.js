// @flow

import React from "react";
import { observer } from "mobx-react";

import "./Loader.scss";

type Props = {
  for: any,
  render: Function
};

@observer
export default class Loader extends React.Component<Props> {
  render() {
    if (this.props.for) return this.props.render();

    return (
      <div className="Loader">
        <i className="fa fa-spinner fa-pulse" /> Loading
      </div>
    );
  }
}
