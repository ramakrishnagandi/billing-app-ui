import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import AuthService from "../Auth/AuthService";

function BillingNavbar({ isLoggedIn, userType }) {
    const logOut = () => {
        AuthService.logout();
        localStorage.clear();
        //bg-custom"
    };
    return (
        <div>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                {
                    isLoggedIn ?
                        <Container>
                            <Navbar.Brand href="/home">Billing App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {/* Customer Dropdown */}
                                    <NavDropdown title="Customer" id="invoice-dropdown">
                                        <NavDropdown.Item href="/addCustomer">New Customer</NavDropdown.Item>
                                        <NavDropdown.Item href="/">Update Customer</NavDropdown.Item>
                                    </NavDropdown>


                                    {
                                        userType === "admin" || userType === "manager" ? (
                                            <Nav>
                                                <Nav.Link href="/product">Product</Nav.Link>
                                                <Nav.Link href="/catogory">Category</Nav.Link>
                                            </Nav>
                                        ) : <></>
                                    }
                                    {/* Invoice Dropdown */}
                                    <NavDropdown title="Orders" id="invoice-dropdown">
                                        <NavDropdown.Item href="/newOrder">New Order</NavDropdown.Item>
                                        <NavDropdown.Item href="/ordersList">Orders List</NavDropdown.Item>
                                    </NavDropdown>


                                    {
                                        userType === "admin" || userType === "manager" ? (
                                            <Nav>
                                                <Nav.Link href="#generate-reports">Reports</Nav.Link>
                                            </Nav>
                                        ) : <></>
                                    }
                                </Nav>
                                {/* Logout on the right */}
                                <Nav className="ms-auto">
                                    {
                                        userType === "admin" ? (
                                            <Nav.Link className="ms-auto" href="/adduser">
                                                Add User
                                            </Nav.Link>
                                        ) : <></>
                                    }
                                    <Nav.Link href="/" onClick={logOut}>
                                        Logout
                                    </Nav.Link>


                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                        :
                        <Container>
                            <Nav className="ms-auto">

                                <Nav.Link className="btn btn-outline-dark" href="/">
                                    Login
                                </Nav.Link>
                            </Nav>
                        </Container>
                }
            </Navbar>
        </div>
    )
}

export default BillingNavbar;
