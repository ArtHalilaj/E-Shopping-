import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logoE-Shopping.png';
import { resetCart } from '../slices/cartSlice';
import { FaComment } from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar style={{backgroundColor:'#DA1E25'}}  variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer  to='/'>
            <Navbar.Brand >
              <img style={{width:'50px'}} src={logo} alt='E-Shopping' />
              E-Shopping
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer style={{color:'white'}} to='/cart'>
                <Nav.Link >
                  <FaShoppingCart style={{color:'white'}} /> Shporta
                  {cartItems.length > 0 && (
                    <Badge   pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
                
                
              {/* {/* </LinkContainer>
              <LinkContainer style={{ color: 'white' }} to='/categories'>
              <Nav.Link>
                Kategorite
              </Nav.Link> */}
            </LinkContainer> 

              {userInfo ? (
                <>
                  <NavDropdown style={{color:'white'}}  title={userInfo.name} id='username'>
                    <LinkContainer   to='/profile'>
                      <NavDropdown.Item>Profili</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer   to='/feedback'>
                      <NavDropdown.Item>Feedback</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  
                </>
              ) : (
                <>
                <LinkContainer  style={{color:'white'}} to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
                
                <LinkContainer style={{color:'white'}} to='/feedback'>
  <Nav.Link>
    <FaComment /> Feedback
  </Nav.Link>
</LinkContainer>
              </>
                
                
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown  title='Admin' id='adminmenu'>
                  <LinkContainer  to='/admin/productlist'>
                    <NavDropdown.Item>Produktet</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer  to='/admin/orderlist'>
                    <NavDropdown.Item>Porosite</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Perdoruesit</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
