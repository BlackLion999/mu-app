import classes from "./Navbar.module.css"
import React, {useState} from "react";
import { Form, Modal, Nav, NavLink, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {

    const [show, setShow] = useState(false);

    const hadleClose = ()=> setShow(false);
    const handleShow = ()=> setShow(true);

    return (
        <>
            <Navbar collapseOnSelect expand="sm" className={classes.nav}>
                <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <NavLink eventKey="1" as={Link} to="/">ToDo</NavLink>
                        <NavLink eventKey="3" as={Link} to="/Home">Home</NavLink>
                        <NavLink eventKey="2" as={Link} to="/AboutUs">AboutUs</NavLink>
                    </Nav>
                </Navbar.Collapse>
                <button type="submit" className={classes.button} onClick={handleShow}>Log In</button>
            </Navbar>

            <Modal show={show} onHide={hadleClose}>
                <Modal.Header className={classes.header} closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body  className={classes.body}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Adress</Form.Label>
                            <Form.Control className={classes.group} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={classes.group} type="password" placeholder="Enter password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}