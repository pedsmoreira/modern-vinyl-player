import React from "react";

import {Icon} from "react-fa";
import {Button} from "react-bootstrap";

import "./PlayerPrevious.scss";

export default class PlayerPrevious extends React.Component {
    render() {
        if (!this.props.hasPrevious) return null

        return (
            <Button bsStyle="link" className="player-previous" onClick={() => this.props.onPrevious()}>
                <Icon name="step-backward"/>
            </Button>
        )
    }
}
