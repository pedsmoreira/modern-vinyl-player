import React from "react";

import {Icon} from "react-fa";
import {Button} from "react-bootstrap";

import "./PlayerNext.scss";

export default class PlayerNext extends React.Component {
    render() {
        if (!this.props.hasNext) return null

        return (
            <Button bsStyle="link" className="player-next" onClick={() => this.props.onNext()}>
                <Icon name="step-forward"/>
            </Button>
        )
    }
}