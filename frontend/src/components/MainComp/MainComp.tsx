import { useState, type FC } from "react";
import "./MainComp.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from "../Profile/Profile";

interface MainCompProps {}

const MainComp: FC<MainCompProps> = () => {
  const user = useSelector((state: any) => state.user.user?.data);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="MainComp ">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>עזרה בדרכים🛣️</Navbar.Brand>
          <strong className="text-light"> שלום {user?.firstName}</strong>
          <Nav className="me-auto">
            {user ? (
              user.role == "admin" ? (
                <Nav.Link as={NavLink} to="/ManagingVolunteers">
                  ניהול מתנדבים
                </Nav.Link>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <Nav.Link as={NavLink} to="/">
              בית
            </Nav.Link>
            <Nav.Link as={NavLink} to="/helpRequests">
              בקשות עזרה
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              כניסה
            </Nav.Link>
            <Nav.Link as={NavLink} to="/VolunteerForm">
              הרשמה
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/profile"> */}
              <Button variant="primary" onClick={handleShow}><i className="bi bi-person-circle"></i></Button>
            {/* </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Outlet></Outlet>


       <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Profile></Profile>
          
          
      </Offcanvas>
    </div>
  );
};

export default MainComp;
