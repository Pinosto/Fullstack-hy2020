import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return(
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link  to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link  to="/users">Users</Link>
          </Nav.Link>
        </Nav>
        {user?
          <Nav >
            <Navbar.Text>
                Signed in as: <a href={`/user/${user?.username}`}>{user?.username}</a>
            </Navbar.Text>
            <Nav.Link href="#" as="span">
              <Link onClick={handleLogout} to="/">logout</Link>
            </Nav.Link>
          </Nav>
          :
          <Nav >
            <Nav.Link href="#" as="span">
              <Link to="/login">login</Link>
            </Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
