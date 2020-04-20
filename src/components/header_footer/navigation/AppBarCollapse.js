import React from 'react';
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import {Link} from 'react-router-dom';


const styles = theme => ({
    buttonBar:{
        [theme.breakpoints.down("xs")]:{
            display:"none"
        }
    }
})

const AppBarCollapse = (props) => {
    return (
        <div className="app-bar-collapse">
            <ButtonAppBarCollapse>
                <MenuItem>
                    <Link className="nav-buttons" to="/accomodation">
                        Accomodation
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className="nav-buttons" to="/services">
                        Services
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className="nav-buttons" to="/gallery">
                        Gallery
                    </Link>
                </MenuItem>
            </ButtonAppBarCollapse>
            <div className={props.classes.buttonBar} id="appbar-collapse">
                <Link className="nav-buttons" to="/accomodation">
                    <Button variant="outlined" color="#3da066">Accomodation</Button>
                </Link>
                <Link className="nav-buttons" to="/services">
                    <Button variant="outlined" color="#3da066">Our Services</Button>
                </Link>
                <Link className="nav-buttons" to="/gallery">
                    <Button variant="outlined" color="#3da066">Gallery</Button>
                </Link>
            </div>
        </div>
    );
};

export default withStyles(styles)(AppBarCollapse);