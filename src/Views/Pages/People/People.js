import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import { ExpandMore } from "@material-ui/icons";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "90%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto"
    },
    row: {
        width: "100%",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    },
    section: {
        backgroundColor: theme.palette.secondary.light,
        width: "100%"
    },
    details: {
        backgroundColor: theme.palette.secondary.main,
        border: `5px solid ${theme.palette.secondary.dark}`
    },
    logo: {
        maxWidth: "200px",
        maxHeight: "60px"
    },
    header: {
        width: "100%"
    }
}));

function People() {
    document.title = "People";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="cisl-faculty-control"
                            id="cisl-faculty-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <img
                                        className={clsx(classes.logo)}
                                        src={
                                            process.env.PUBLIC_URL + "/cisl.png"
                                        }
                                        alt="cisl-logo"
                                    />
                                </div>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h2" color="primary">
                                        CISL Faculty
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="hui-su-control"
                                                id="hui-su-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/huisu.jpg"
                                                            }
                                                            alt="hui-su-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Hui Su
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="helen-zhou-control"
                                                id="helen-zhou-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/helenzhou.jpg"
                                                            }
                                                            alt="helen-zhou-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Helen Zhou
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Yalun “Helen” Zhou is an
                                                    Associate Professor at
                                                    Rensselaer Polytechnic
                                                    Institute (USA). Her
                                                    research interests lie in
                                                    the intersection of SLA and
                                                    emerging technology-assisted
                                                    L2 pedagogy.
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="jonas-braasch-control"
                                                id="jonas-braasch-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/jonasbraasch.jpg"
                                                            }
                                                            alt="jonas-braasch-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Jonas Braasch
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="mei-si-control"
                                                id="mei-si-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/meisi.jpg"
                                                            }
                                                            alt="mei-si-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Mei Si
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>

            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="cisl-students-control"
                            id="cisl-students-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <img
                                        className={clsx(classes.logo)}
                                        src={
                                            process.env.PUBLIC_URL + "/cisl.png"
                                        }
                                        alt="cisl-logo"
                                    />
                                </div>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h2" color="primary">
                                        CISL Students
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="jeramey-tyler-control"
                                                id="jeramey-tyler-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/jerameytyler.jpg"
                                                            }
                                                            alt="jeramey-tyler-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Jeramey Tyler
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="matthew-peveler-control"
                                                id="matthew-peveler-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/mattpeveler.png"
                                                            }
                                                            alt="matthew-peveler-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Matthew Peveler
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="samuel-chabot-control"
                                                id="samuel-chabot-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/samuelchabot.jpeg"
                                                            }
                                                            alt="samuel-chabot-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Samuel Chabot
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Samuel Chabot a PhD student
                                                    of Architectural Acoustics
                                                    in the Cognitive and
                                                    Immersive Systems Lab. His
                                                    area of research focuses on
                                                    the development and use of
                                                    immersive virtual
                                                    environments for
                                                    human-scale, collaborative
                                                    learning. He has worked with
                                                    professors and classes of
                                                    architecture, lighting, and
                                                    language acquisition to best
                                                    realize the potential of
                                                    these spaces. He is also
                                                    particularly interested in
                                                    spatial audio systems and
                                                    human-computer interactions
                                                    and enjoys working closely
                                                    with artists and creatives
                                                    within these environments.
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="justin-orefice-control"
                                                id="justin-orefice-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/justinorefice.jpg"
                                                            }
                                                            alt="justin-orefice-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Justin Orefice
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Justin Orefice is a current
                                                    senior at Rensselaer
                                                    Polytechnic Institute and is
                                                    a dual major in Computer
                                                    Science and Business and
                                                    Management, with a
                                                    concentration on Artificial
                                                    Intelligence. At his time at
                                                    the Cognitive and Immersive
                                                    Systems Lab (CISL), he has
                                                    worked on this project as
                                                    well as the Intelligence
                                                    Analysis Room, where he
                                                    helped research and design a
                                                    process to match keywords or
                                                    phrases to news articles.
                                                    Outside of CISL at RPI,
                                                    Justin has contributed to
                                                    two other projects with the
                                                    university: PUMI-PIC, a
                                                    group of support libraries
                                                    for unstructured mesh
                                                    particle in cell simulations
                                                    on GPUs and CPUs, and Venue,
                                                    a tool to help event
                                                    organizers check people in
                                                    by having the user take a
                                                    picture of themselves while
                                                    at the event. Justin has
                                                    also worked for NASA at the
                                                    Goddard Space Flight Center,
                                                    where he was able to write
                                                    software to help analyze the
                                                    effect of weather on the
                                                    global radiation budget, and
                                                    also to verify the integrity
                                                    of the data coming in from
                                                    satellites.
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="nico-cobb-control"
                                                id="nico-cobb-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/nicocobb.jpg"
                                                            }
                                                            alt="nico-cobb-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Nico Cobb
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>

            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="rcos-faculty-control"
                            id="rcos-faculty-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <img
                                        className={clsx(classes.logo)}
                                        src={
                                            process.env.PUBLIC_URL + "/rcos.png"
                                        }
                                        alt="rcos-logo"
                                    />
                                </div>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h2" color="primary">
                                        RCOS Faculty
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    >
                                        <ExpansionPanel
                                            className={clsx(classes.section)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMore />}
                                                aria-controls="wesley-turner-control"
                                                id="wesly-turner-header"
                                            >
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                "/wesleyturner.jpg"
                                                            }
                                                            alt="wesley-turner-avatar"
                                                        />
                                                    </Avatar>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        classes.pad
                                                    )}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        color="primary"
                                                    >
                                                        Wesley Turner
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails
                                                className={clsx(
                                                    classes.details
                                                )}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Bio
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>

            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="rcos-students-control"
                            id="rcos-students-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <img
                                        className={clsx(classes.logo)}
                                        src={
                                            process.env.PUBLIC_URL + "/rcos.png"
                                        }
                                        alt="rcos-logo"
                                    />
                                </div>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h2" color="primary">
                                        RCOS Students
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div
                                        className={clsx(
                                            classes.pad,
                                            classes.header
                                        )}
                                    />
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>

            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="contributors-control"
                            id="contributors-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h2" color="primary">
                                        Other Contributors
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <ul>
                                            <li>Jerry Huang</li>
                                            <li>Yu Chen</li>
                                            <li>Isaac Llewellyn</li>
                                            <li>Matthew Carlson</li>
                                            <li>Anthony Chen</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        </div>
    );
}

People.displayName = "People";
export default People;
