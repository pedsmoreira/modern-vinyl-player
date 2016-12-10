import * as React from "react";

import {Link} from "react-router";
import {Grid} from "react-bootstrap";
import {Icon} from "react-fa";

import "./Footer.scss";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Grid>
          <div className="footer_content">
            <Link to="/albums">
              <Icon name="rocket"/> Albums
            </Link>

            <Link to="/artists">
              <Icon name="microphone"/> Artists
            </Link>

            <Link to="/contact">
              <Icon name="at"/> Contact
            </Link>
          </div>
        </Grid>
      </footer>
    )
  }
}