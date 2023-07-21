import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    function getSearchQuery(event) {
        setSearchQuery(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();
        setIsExpanded(false);

        let queryString = `title=true&q=${searchQuery}`;
        router.push(`/artwork?${queryString}`);
        setSearchHistory(current => [...current, queryString]);

    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top" data-bs-theme="dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand >Huu Tinh Luu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link className={router.pathname === "/" } onClick={() => setIsExpanded(false)}>Home</Nav.Link></Link>
                            <Link href="/search" passHref legacyBehavior><Nav.Link className={router.pathname === "/search" } onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link></Link>
                        </Nav>

                        &nbsp;
                        <Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control onChange={getSearchQuery} type="search" placeholder="Search" className="me-2 bg-white" aria-label="Search" />
                            <Button type='submit' variant="success">Search</Button>
                        </Form>
                        &nbsp;

                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <Link href="/favorite" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/favorite"} onClick={() => setIsExpanded(false)} href="#action/3.1">Favorites</NavDropdown.Item></Nav.Link></Link>
                                <Link href="/history" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)} href="#action/3.2">History</NavDropdown.Item></Nav.Link></Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}
