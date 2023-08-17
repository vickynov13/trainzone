import { Navbar, Nav, Container, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
import { useState } from 'react';

function Header({upstate}){
    const[ddButtonValue, setddButtonValue]=useState("AutoRefresh - Disabled")
    const[disableflag, setdisableflag]=useState(true)
    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Circuit Ctrl</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home" onClick={() => upstate(100)}>Pilot</Nav.Link>
                    <DropdownButton as={ButtonGroup} variant="secondary" title={ddButtonValue}>
                        <Dropdown.Item onClick={() => updateRefresh(5)}>Auto refreshRate - 5s</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateRefresh(10)}>Auto refreshRate - 10s</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateRefresh(15)}>Auto refreshRate - 15s</Dropdown.Item>
                        {
                            (disableflag)?null: <Dropdown.Item onClick={() => updateRefresh(0)}>Disable AutoRefresh</Dropdown.Item>
                        }
                    </DropdownButton>
                </Nav>
            </Container>
        </Navbar>
        </>
    );
    function updateRefresh(intervalRate){
        if(intervalRate===0){
            setddButtonValue("AutoRefresh - Disabled");
            setdisableflag(true);
        }else{
            setddButtonValue(`Auto refreshRate - ${intervalRate}s`);
            setdisableflag(false);
        }
        upstate(intervalRate);
    }
}
export default Header;