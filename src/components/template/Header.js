import * as React from 'react'

import {Link} from 'react-router'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export default class Header extends React.Component {
  render() {
    return (
      <Navbar inverse staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Modern Vinyl Player</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/album">
              <NavItem>Albums</NavItem>
            </LinkContainer>

            <LinkContainer to="/artist">
              <NavItem>Artists</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}