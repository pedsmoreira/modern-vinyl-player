import React from "react";

import {Grid, Button} from "react-bootstrap";
import {Link} from "react-router";
import {Icon} from "react-fa";

import "./HomeView.scss";

export default class HomeView extends React.Component {
  render() {
    return (
      <div className="home-view animated fadeIn">
        <Grid>
          <div className="home-view_cover"></div>

          <section className="home-view_title">
            <h1>A music player<br/>for modern browsers</h1>
            <Link className="home-view_github" to="https://github.com/pedsmoreira/modern-vinyl-player/" target="_blank">
              <Icon name="github"/> Github
            </Link>
          </section>

          <div className="text-center">
            <Link to="/albums" className="btn btn-link home-view_play">
              <Icon name="headphones"/> Listen
            </Link>
          </div>
        </Grid>
      </div>
    )
  }
}
