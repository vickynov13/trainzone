import { Navbar, Nav, Container} from 'react-bootstrap';

function Header(){
    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Circuit Ctrl</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Pilot</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    );
}
export default Header;