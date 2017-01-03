import * as React from 'react'

import {Button} from "react-bootstrap";
import {Icon} from "react-fa";

import Loader from "../Loader";

import "./PlayerControl.scss"

export default class PlayerControl extends React.Component {
    render() {
        let classNames = ['player-control']
        if (this.props.selected) {
            classNames.push('player-control--selected')
        }

        return (
            <div className={classNames.join(' ')}>
                {this.content()}
            </div>
        )
    }

    content() {
        if (this.props.playing && (this.props.selected || !this.props.value)) {
            if (this.props.loading) {
                return <Loader/>
            }

            return (
                <Button bsStyle="link" className="player-control_pause" onClick={() => this.props.onPause()}>
                    <Icon name="pause"/>
                </Button>
            )
        }

        return (
            <Button bsStyle="link" className="player-control_play" onClick={() => this.props.onPlay(this.props.value)}>
                <Icon name="play"/>
            </Button>
        )
    }
}
