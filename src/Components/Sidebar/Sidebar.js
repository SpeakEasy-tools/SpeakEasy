import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faBook,
    faCaretLeft,
    faDice,
    faEllipsisH,
    faEye,
    faGripHorizontal,
    faImages,
    faInfo,
    faList,
    faListOl,
    faQuestion,
    faQuestionCircle,
    faSignOutAlt,
    faStickyNote,
    faTh,
    faToolbox,
    faUser,
    faUserCog,
    faUserGraduate,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemIcon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FirebaseUI, useAuth } from "../../Firebase";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    root: {
        width: "auto",
        height: "100%",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        display: "flex",
        flexFlow: "row noWrap"
    },
    column: {
        flex: "1 1 100%",
        borderRight: `2px solid ${theme.palette.primary.dark}`
    },
    selected: {
        backgroundColor: theme.palette.secondary.dark
    },
    icon: {
        color: theme.palette.secondary.contrastText
    }
}));

function Sidebar() {
    const classes = useStyles(Theme);

    const auth = useAuth();
    const [user, setUser] = useState(null);
    const [allowedRoles, setAllowedRoles] = useState(null);

    const [signIn, setSignIn] = useState(null);
    const [selected, setSelected] = useState(null);

    const handleSelection = menu => {
        switch (menu) {
            case "user":
                setSelected(prevState =>
                    prevState === "user" ? null : "user"
                );
                break;
            case "games":
                setSelected(prevState =>
                    prevState === "games" ? null : "games"
                );
                break;
            case "tools":
                setSelected(prevState =>
                    prevState === "tools" ? null : "tools"
                );
                break;
            case "more":
                setSelected(prevState =>
                    prevState === "more" ? null : "more"
                );
                break;
            default:
                setSelected(null);
                break;
        }
    };
    const handleSignIn = () => {
        setSignIn(true);
        handleSelection("user");
    };

    useEffect(() => {
        if (auth && auth.user && auth.allowedRoles) {
            setUser(auth.user);
            setAllowedRoles(auth.allowedRoles);
        }
    }, [auth]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <List>
                    {user ? (
                        <ListItem
                            button
                            onClick={() => handleSelection("user")}
                        >
                            <ListItemIcon>
                                <Avatar>
                                    <img
                                        src={user.photoURL}
                                        style={{ maxWidth: "100%" }}
                                        alt="User menu"
                                    />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary="User" />
                        </ListItem>
                    ) : (
                        <ListItem button onClick={handleSignIn}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faUser}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Sign In" />
                        </ListItem>
                    )}
                    <ListItem button onClick={() => handleSelection("games")}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                className={clsx(classes.icon)}
                                size="lg"
                                icon={faDice}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Games" />
                    </ListItem>
                    <ListItem button onClick={() => handleSelection("tools")}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                className={clsx(classes.icon)}
                                size="lg"
                                icon={faToolbox}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Tools" />
                    </ListItem>
                    <ListItem button onClick={() => handleSelection("more")}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                className={clsx(classes.icon)}
                                size="lg"
                                icon={faEllipsisH}
                            />
                        </ListItemIcon>
                        <ListItemText primary="More" />
                    </ListItem>
                </List>
            </div>
            {signIn && selected && selected === "user" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={() => setSignIn(false)}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faCaretLeft}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItem>
                    </List>
                    <FirebaseUI />
                </div>
            )}
            {!signIn && selected && selected === "user" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faCaretLeft}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItem>
                        <ListItem button component={Link} to="/profile">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faUserCog}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        {user &&
                            allowedRoles &&
                            allowedRoles.includes("instructor") && (
                                <ListItem
                                    button
                                    component={Link}
                                    to="/instructor"
                                >
                                    <ListItemIcon>
                                        <FontAwesomeIcon
                                            className={clsx(classes.icon)}
                                            size="lg"
                                            icon={faUserGraduate}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Instructor" />
                                </ListItem>
                            )}
                        <ListItem button onClick={() => auth.signOut()}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faSignOutAlt}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Sign Out" />
                        </ListItem>
                    </List>
                </div>
            )}
            {selected && selected === "games" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faCaretLeft}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItem>
                        <ListItem button component={Link} to="/2048">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faTh}
                                />
                            </ListItemIcon>
                            <ListItemText primary="2048" />
                        </ListItem>
                        <ListItem button component={Link} to="/eye_spy">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faEye}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Eye-Spy" />
                        </ListItem>
                        <ListItem button component={Link} to="/memory">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faGripHorizontal}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Memory" />
                        </ListItem>
                    </List>
                </div>
            )}
            {selected && selected === "tools" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faCaretLeft}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItem>

                        <ListItem button component={Link} to="/coco_explorer">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faImages}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Coco Explorer" />
                        </ListItem>

                        <ListItem button component={Link} to="/dictionary">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faBook}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Dictionary" />
                        </ListItem>
                        <ListItem button component={Link} to="/flashcards">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faStickyNote}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Flashcards" />
                        </ListItem>
                        <ListItem button component={Link} to="/pop_quiz">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faListOl}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Pop Quiz" />
                        </ListItem>
                    </List>
                </div>
            )}
            {selected && selected === "more" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faCaretLeft}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItem>
                        <ListItem button component={Link} to="/about">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faInfo}
                                />
                            </ListItemIcon>
                            <ListItemText primary="About Us" />
                        </ListItem>
                        <ListItem button component={Link} to="/attributions">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faList}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Attributions" />
                        </ListItem>
                        <ListItem button component={Link} to="/contact">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faAddressCard}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Contact" />
                        </ListItem>
                        <ListItem button component={Link} to="/faq">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faQuestion}
                                />
                            </ListItemIcon>
                            <ListItemText primary="FAQ" />
                        </ListItem>
                        <ListItem button component={Link} to="/help">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faQuestionCircle}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Help" />
                        </ListItem>
                        <ListItem button component={Link} to="/people">
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    className={clsx(classes.icon)}
                                    size="lg"
                                    icon={faUsers}
                                />
                            </ListItemIcon>
                            <ListItemText primary="People" />
                        </ListItem>
                    </List>
                </div>
            )}
        </div>
    );
}

Sidebar.displayName = "Sidebar";
export default Sidebar;
