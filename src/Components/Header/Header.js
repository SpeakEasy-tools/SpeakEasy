import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Clear, Help, Translate } from "@material-ui/icons";
import { Theme } from "../../utils";
import clsx from "clsx";
import { Breadcrumbs } from "../Breadcrumbs";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { LanguageSelect } from "../LanguageSelect";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    },
    row: {
        width: "100%",
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    icon: {
        color: theme.palette.primary.main,
        "&hover:": {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

function Header() {
    const classes = useStyles(Theme);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Button
                        component={Link}
                        to="/"
                        style={{
                            backgroundColor: Theme.palette.secondary.main,
                            color: Theme.palette.secondary.contrastText
                        }}
                    >
                        <Avatar
                            style={{
                                backgroundColor: Theme.palette.secondary.main
                            }}
                        >
                            <Translate />
                        </Avatar>
                        <Typography variant="h4" color="primary">
                            SpeakEasy.tools
                        </Typography>
                    </Button>
                </div>
                <div>
                    <Breadcrumbs />
                </div>
                <div className={clsx(classes.pad)}>
                    <LanguageSelect />
                </div>
                <div className={clsx(classes.pad)}>
                    <IconButton
                        className={clsx(classes.icon)}
                        onClick={handleClick}
                    >
                        <Help />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <IconButton onClick={handleClose}>
                                    <Clear />
                                </IconButton>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                >
                                    Close
                                </Typography>
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography variant="h6" color="secondary">
                                    Language Selector
                                </Typography>
                            </div>
                            <Divider />
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                >
                                    Language Selector
                                </Typography>
                            </div>
                            <Divider />
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

Header.displayName = "Header";
Header.propTypes = {
    setLanguage: PropTypes.func
};
export default Header;
