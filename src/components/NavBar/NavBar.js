import classes from "./Navbar.module.css"
import { Nav, NavLink, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../utils/utils";
import { setAutorization } from "../../redux/features/authReducer";
import { getToken } from "../../utils/utils";


export default function NavBar() {

    const successAuto = useSelector(state => state.userReducer.successAuthorization);
    const disppatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        disppatch(setAutorization(false));
        removeToken();
        if (!getToken()) {
            navigate('/')
        }

    }

    return (
        <>
            <Navbar collapseOnSelect expand="sm" className={classes.nav}>
                <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                        <NavLink eventKey="3" as={Link} to="/todo">ToDo</NavLink>
                        <NavLink eventKey="2" as={Link} to="/about">AboutUs</NavLink>
                    </Nav>
                </Navbar.Collapse>
                {
                    successAuto ?
                        <Button className="w-25 m-2" onClick={handleSignOut}>Sign out</Button>
                        :
                        <Button>
                            <Link to='/signin'className="w-25 m-2">
                                Sing in
                            </Link>
                        </Button>
                }
            </Navbar>
        </>
    )
}
