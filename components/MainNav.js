import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MainNav() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    function getSearchQuery(event) {
        setSearchQuery(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();
        router.push(`/artwork?q=${encodeURIComponent(searchQuery)}`);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand >Huu Tinh Luu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link className={router.pathname === "/" ? "active" : ""}>Home</Nav.Link></Link>
                            <Link href="/search" passHref legacyBehavior><Nav.Link >Advanced Search</Nav.Link></Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control onChange={getSearchQuery} type="search" placeholder="Search" className="me-2 bg-white" aria-label="Search" />
                            <Button type='submit' variant="success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
