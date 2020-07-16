import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import clsx from "clsx";
import {
    Build,
    BurstMode,
    Casino,
    Contacts,
    CropFree,
    ExitToApp,
    GridOn,
    Help,
    Info,
    KeyboardArrowLeft,
    ListAlt,
    MoreHoriz,
    Notes,
    PersonOutline,
    RecentActors,
    Search,
    ShowChart,
    SupervisorAccount,
    ViewComfy,
    Visibility
} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemIcon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../Firebase";
import Avatar from "@material-ui/core/Avatar";
import { FirebaseUI } from "../../Firebase";

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
        if (!(auth && auth.user)) return;
        setUser(auth.user);
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
                        </ListItem>
                    ) : (
                        <ListItem button onClick={handleSignIn}>
                            <ListItemIcon>
                                <PersonOutline className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                    )}
                    <ListItem button onClick={() => handleSelection("games")}>
                        <ListItemIcon>
                            <Casino className={clsx(classes.icon)} />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={() => handleSelection("tools")}>
                        <Build className={clsx(classes.icon)} />
                    </ListItem>
                    <ListItem button onClick={() => handleSelection("more")}>
                        <MoreHoriz className={clsx(classes.icon)} />
                    </ListItem>
                </List>
            </div>
            {signIn && selected && selected === "user" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={() => setSignIn(false)}>
                            <ListItemIcon>
                                <KeyboardArrowLeft
                                    className={clsx(classes.icon)}
                                />
                            </ListItemIcon>
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
                                <KeyboardArrowLeft
                                    className={clsx(classes.icon)}
                                />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/profile">
                            <ListItemIcon>
                                <PersonOutline className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                        {user && user["instructor"] && (
                            <ListItem button component={Link} to="/instructor">
                                <ListItemIcon>
                                    <SupervisorAccount
                                        className={clsx(classes.icon)}
                                    />
                                </ListItemIcon>
                            </ListItem>
                        )}
                        <ListItem button onClick={() => auth.signOut()}>
                            <ListItemIcon>
                                <ExitToApp className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </div>
            )}
            {selected && selected === "games" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <KeyboardArrowLeft
                                    className={clsx(classes.icon)}
                                />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/2048">
                            <ListItemIcon>
                                <ViewComfy className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/eye_spy">
                            <ListItemIcon>
                                <Visibility className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/tile_slider">
                            <CropFree />
                        </ListItem>
                        <ListItem button component={Link} to="/sudoku">
                            <GridOn />
                        </ListItem>
                        <ListItem button component={Link} to="/kakuro">
                            <GridOn />
                        </ListItem>
                    </List>
                </div>
            )}
            {selected && selected === "tools" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <KeyboardArrowLeft
                                    className={clsx(classes.icon)}
                                />
                            </ListItemIcon>
                        </ListItem>

                        <ListItem button component={Link} to="/coco_explorer">
                            <ListItemIcon>
                                <BurstMode className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/dictionary">
                            <ListItemIcon>
                                <Search className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/flashcards">
                            <ListItemIcon>
                                <Notes className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/pop_quiz">
                            <ListAlt />
                        </ListItem>
                        <ListItem button component={Link} to="/tone_trainer">
                            <ShowChart />
                        </ListItem>
                    </List>
                </div>
            )}
            {selected && selected === "more" && (
                <div className={clsx(classes.column)}>
                    <List>
                        <ListItem button onClick={handleSelection}>
                            <ListItemIcon>
                                <KeyboardArrowLeft
                                    className={clsx(classes.icon)}
                                />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button component={Link} to="/about">
                            <ListItemIcon>
                                <RecentActors className={clsx(classes.icon)} />
                            </ListItemIcon>
                        </ListItem>

                        <ListItem button component={Link} to="/contact">
                            <Contacts />
                        </ListItem>
                        <ListItem button component={Link} to="/faq">
                            <Help />
                        </ListItem>
                        <ListItem button component={Link} to="/help">
                            <Info />
                        </ListItem>
                    </List>
                </div>
            )}
        </div>
    );
}
Sidebar.displayName = "Sidebar";
export default Sidebar;
