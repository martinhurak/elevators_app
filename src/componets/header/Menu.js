
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Outlet } from 'react-router-dom';
import {  useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

function Menu() {

  const [offCanvasMenu, setOffCanvasMenu] = useState(false);

  return (
    <> 
    {
        <Navbar key={"md"} bg="dark" variant="dark" expand={"md"} className="mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="elevator_app" href="#">
               Výtahy
            </Navbar.Brand>
            <Navbar.Toggle onClick={()=>setOffCanvasMenu(true)}  aria-controls={`offcanvasNavbar-expand-${"md"}`} />
             <Navbar.Offcanvas 
              show={offCanvasMenu}
              onHide={() => setOffCanvasMenu(false)}
              id={`offcanvasNavbar-expand-${"md"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
              placement="end"
            >
              <Offcanvas.Header closeButton  >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`} >
                 Výtahy
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                    title="Služba"
                    id={`offcanvasNavbarDropdown-expand-${"md"}`}
                  >
                    <NavDropdown.Item onClick={()=> setOffCanvasMenu(false)} as={Link} to="elevator_app/serviceNote"> Pridaj zázanam </NavDropdown.Item>
                    <NavDropdown.Item onClick={()=> setOffCanvasMenu(false)} as={Link} to="elevator_app/allServices"> Zobraz zaznamy </NavDropdown.Item>

                  </NavDropdown>   
                  <Nav.Link onClick={()=> setOffCanvasMenu(false)} as={Link} to="elevator_app" > Vyhladavnie</Nav.Link>
                </Nav>
                <Outlet/>
                <Form className="d-flex">
                </Form>
              </Offcanvas.Body> 
            </Navbar.Offcanvas> 
          </Container>
        </Navbar> 
       }
    </>
  );
}

export default Menu;


