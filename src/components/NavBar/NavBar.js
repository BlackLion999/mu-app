import classes from "./Navbar.module.css"
import React from "react";

export default function NavBar() {
    return (
        <nav className={classes.nav}>
            <div className={classes.items}>
                <a href="#" className={classes.active}>ToDo</a>
                <a href="#">Home</a>
                <a href="#">AboutUs</a>
            </div>
        </nav>
    )
}