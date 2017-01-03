import React from "react";

import {Grid} from "react-bootstrap";
import {Link} from "react-router";
import {Icon} from "react-fa";

import Background from "../../components/Background"

import "./HomeView.scss";

export default class HomeView extends React.Component {
    render() {
        return (
            <div className="home-view animated fadeIn">
                <Grid>
                    <Background
                        image="http://hdwallpaperslatest.com/wp-content/uploads/2016/03/People-Hands-Concert-Music-Crowd-HD-Background.jpg"/>

                    <section className="home-view_title">
                        <h1>A music player<br/>for modern browsers</h1>
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
