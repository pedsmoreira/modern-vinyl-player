import * as React from "react";

import {Image} from "react-bootstrap";

import image from "../../images/vinyl.png";
import "./Disc.scss";

export default class DiscComponent extends React.Component {
  render() {
    return (
      <div className="disc">
        <Image className="disc_image" src={image} responsive/>
        {!this.props.album ? null :
          <Image className="disc_album" src={this.props.album.cover}/>
        }
      </div>
    )
  }
}
