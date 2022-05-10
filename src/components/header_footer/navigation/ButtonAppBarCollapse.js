import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
    buttonCollapse: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
    }
});

class ButtonAppBarCollapse extends Component {

    state = {
        anchorEl: null
    }
    /* constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleMenu = this.handleMenu.bind(this);
    } */
    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose(){
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.buttonCollapse}>
                <IconButton 
                    style={{
                        backgroundColor: this.state.headerTransparent ? "transparent" : "#09779A",
                        outline:'none',
                        color:'#fff'
                    }}
                    onClick={(event) => this.handleMenu(event)}>
                        
                        <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={() => this.handleClose()}
                >
                    {this.props.children}
                </Menu>
            </div>
        );
    }
}
export default withStyles(styles)(ButtonAppBarCollapse);
