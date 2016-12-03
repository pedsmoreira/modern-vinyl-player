import * as React from 'react'

import Play from './controls/Play'
import Pause from './controls/Pause'

const styles = require('./Controls.css')

export default class Controls extends React.Component {
  render() {
    return (
      <div className={styles.controls}>
        <Play play={this.props.play}/>
        <Pause pause={this.props.pause}/>
      </div>
    )
  }
}
