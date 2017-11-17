// @flow

import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

@observer
export default class Navbar extends React.Component<*> {
  render() {
    if (this.props.for) return this.props.render();

    return (
      <div className="Navbar">
        <nav>
          <div className="container">
            <Link className="Navbar__home" to="/">
              <i className="fa fa-headphones" /> Premiere Player
            </Link>

            <div className="float-right">
              <Link to="/" className="Navbar__link">
                Albums
              </Link>
              <Link to="/artists" className="Navbar__link">
                Artists
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
