import * as React from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import './NavMenu.css';
import { AppContext } from '../App';

export function NavMenu(): JSX.Element {

  const [collapsed, setCollapsed] = React.useState(true);

  const menuItems = React.useContext(AppContext).menuItems;

  const menuItemNavs = menuItems.map((m, i) => {
    return (
      <NavItem key={i}>
        <NavLink className="nav-link" to={m.path} activeClassName="bg-secondary text-white" exact={m.exact}>{m.label}</NavLink>
      </NavItem>
    );
  });

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">Timesheet</NavbarBrand>
          <NavbarToggler onClick={() => setCollapsed(!collapsed)} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <Nav className="flex-grow" navbar pills>
              {menuItemNavs}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
