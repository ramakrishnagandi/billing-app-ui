import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import AuthService from "../Auth/AuthService";

function BillingNavbar() {
    const isUserAuth = localStorage.getItem("user");
    const logOut = () => {
        AuthService.logout();
        localStorage.clear();
        //bg-custom"
    };
    return (
        <div>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                {
                    isUserAuth ?
                        <Container>
                            <Navbar.Brand href="#">Billing App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {/* Customer Dropdown */}
                                    <Nav>
                                        <Nav.Link href="/">Customer</Nav.Link>
                                    </Nav>
                                    { /* <NavDropdown title="Customer" id="customer-dropdown">
                                        <NavDropdown.Item href="#add-customer">Add</NavDropdown.Item>
                                        <NavDropdown.Item href="#update-customer">Update</NavDropdown.Item>
                                        <NavDropdown.Item href="#delete-customer">Delete</NavDropdown.Item>
                                    </NavDropdown> */}
                                    {/* Product Dropdown */}
                                    <Nav>
                                        <Nav.Link href="/product">Product</Nav.Link>
                                    </Nav>

                                    {/* Product Dropdown */}
                                    <Nav>
                                        <Nav.Link href="/catogory">Category</Nav.Link>
                                    </Nav>

                                    {/* Invoice Dropdown */}
                                    <NavDropdown title="Invoice" id="invoice-dropdown">
                                        <NavDropdown.Item href="/newInvoice">New Invoice</NavDropdown.Item>
                                        <NavDropdown.Item href="#invoices-list">Invoices List</NavDropdown.Item>
                                    </NavDropdown>

                                    {/* Reports */}
                                    <Nav.Link href="#generate-reports">Reports</Nav.Link>
                                </Nav>
                                {/* Logout on the right */}
                                <Nav className="ms-auto">
                                    <Nav.Link href="/" onClick={logOut}>Logout</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                        :
                        <Container>
                            <Nav className="ms-auto">
                                <Nav.Link className="btn btn-outline-dark" href="/adduser">
                                    Add User
                                </Nav.Link>
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
