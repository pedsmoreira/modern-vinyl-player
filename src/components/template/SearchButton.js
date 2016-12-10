import React from "react";

import {Button} from "react-bootstrap";
import {Icon} from "react-fa";

import "./SearchButton.scss";

export default class SearchButton extends React.Component {
  render() {
    return (
      <Button bsStyle="link" className="search-button">
        <Icon name="search" size="lg"/> Search
      </Button>
    )
  }
}
