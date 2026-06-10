import type { FC } from 'react';
import './MainComp.scss';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface MainCompProps {}

const MainComp: FC<MainCompProps> = () => {
  const user = useSelector((state: any) => state.user.user?.data); 

  return <div className="MainComp ">
     <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >עזרה בדרכים🛣️</Navbar.Brand>
          <strong className="text-light"> שלום {user?.firstName}</strong>
          <Nav className="me-auto">
         <Nav.Link  as={NavLink} to="/">בית</Nav.Link>
            <Nav.Link as={NavLink} to="/login">כניסה</Nav.Link>
            <Nav.Link as={NavLink} to="/signUp">הרשמה</Nav.Link>
          </Nav>
           
        </Container>
      </Navbar>
      <Outlet></Outlet>
  </div>
}

export default MainComp;
