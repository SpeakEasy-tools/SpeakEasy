import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import { Menu, MenuItem, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    focused: {
        backgroundColor: theme.palette.secondary.light
    },
    button: {
        ...theme.typography.h4,
        borderRadius: 0,
        paddingTop: "7%"
    }
}));

const options = ["\u00A0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Tile({ val, onClick, id }) {
    const classes = useStyles(Theme);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = index => {
        if (index === 0) {
            val = "\u00A0";
        } else {
            val = index.toString();
        }
        setSelectedIndex(index);
        handleClose();
        onClick(val);
        document.getElementById(id).textContent = val.toString();
    };

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                aria-label={val}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={() => handleMenuItemClick(index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            <Button
                id={id}
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="outlined"
                onClick={handleClick}
                classes={{ root: classes.button }}
            >
                <Typography variant="h4">{val}</Typography>
            </Button>
        </>
    );
}

Tile.displayName = "Tile";
Tile.propTypes = {
    val: PropTypes.any,
    onClick: PropTypes.any,
    id: PropTypes.any
};
export default Tile;
