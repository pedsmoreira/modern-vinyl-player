import * as React from "react";

import {Link} from "react-router";
import {Grid} from "react-bootstrap";

import SearchButton from "./SearchButton";

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

          <SearchButton/>
        </Grid>
      </header>
    )
  }
}