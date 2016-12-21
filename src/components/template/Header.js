import * as React from "react";

import {Link} from "react-router";
import {Grid} from "react-bootstrap";
import {Icon} from "react-fa";

import logo from "../../images/logo.png";

import "./Header.scss";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Grid>
          <Link to="/" className="header_logo">
            <img src={logo} style={{width: 128}} alt="Logo"/>
          </Link>

          <Link className="header_github" to="https://github.com/pedsmoreira/premiere-player/"
                target="_blank">
            <Icon name="github"/> Github
          </Link>
        </Grid>
      </header>
    )
  }
}