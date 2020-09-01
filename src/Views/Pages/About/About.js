import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { ExpandMore } from "@material-ui/icons";

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

function About() {
    document.title = "About Us";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="cisl-control"
                            id="cisl-header"
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
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            The Cognitive and Immersive Systems
                                            Lab (CISL) is a multi-year
                                            collaboration program between
                                            Rensselaer Polytechnic Institute and
                                            IBM Research to lead the frontier of
                                            research and development in
                                            immersive cognitive systems. CISL
                                            promotes a culture of
                                            multidisciplinary research across
                                            science, engineering, art,
                                            communications, architecture, and
                                            business. Our mission is to create
                                            scientific breakthroughs and
                                            technical innovations that augment
                                            group intelligence in real world
                                            scenarios. Cognitive computing
                                            systems are increasingly prevalent
                                            in our society. The ways in which we
                                            engage information in our daily
                                            lives are becoming ever more
                                            immersive. The paradigm of human
                                            computer interaction will soon shift
                                            towards partnership between human
                                            beings and intelligent machines
                                            through human-scale and immersive
                                            experiences. What changes will this
                                            paradigm shift bring to our world?
                                            How will it transform our society?
                                            And how will it help us to solve the
                                            large and complex problems we face
                                            today? The core platform of CISL is
                                            the Cognitive Immersive Room (also
                                            called “Situations Room”) — an
                                            immersive, interactive,
                                            reconfigurable physical environment
                                            that can augment group intelligence
                                            in complex problem solving and
                                            decision making. The initial domains
                                            investigated for the situations room
                                            include cyber-enabled exploration
                                            and discovery, cognitive and
                                            immersive learning, corporate
                                            decision making, and intelligence
                                            analysis. Collaboration between IBM
                                            & Rensselaer dates back to the
                                            1960’s when Amos was the most
                                            powerful supercomputer at a Private
                                            Educational Institute in the U.S. at
                                            that time. In this new
                                            collaboration, CISL has established
                                            an extended partnership model for
                                            funded research from Government
                                            Agencies and Industry Leaders, and
                                            maintains an open research
                                            ecosystem.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="rpi-control"
                            id="rpi-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <img
                                        className={clsx(classes.logo)}
                                        src={
                                            process.env.PUBLIC_URL + "/rpi.png"
                                        }
                                        alt="rpi-logo"
                                    />
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            Rensselaer Polytechnic Institute is
                                            America’s first technological
                                            research university. Founded in
                                            1824, our university has been
                                            leading scientific and technological
                                            advances for nearly 200 years and
                                            we’re just getting started. With
                                            450+ dedicated full-time faculty
                                            members, including 270 tenured
                                            faculty members, 7,940+ students,
                                            and 100,000+ living alumni, our
                                            community pushes boundaries to
                                            address the global challenges facing
                                            the 21st century. We educate the
                                            leaders of tomorrow and work to
                                            improve lives, advance society, and
                                            change the world.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="rcos-control"
                            id="rcos-header"
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
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            The Rensselaer Center for Open
                                            Source is a group of RPI students
                                            who work on open source projects.
                                            Their mission statement is &ldquo;To
                                            cultivate an inclusive, creative,
                                            and entrepreneurial community that
                                            seeks to empower students to develop
                                            open-source solutions to real-world
                                            problems.&rdquo;
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="ibm-control"
                            id="ibm-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <img
                                        className={clsx(classes.logo)}
                                        src={
                                            process.env.PUBLIC_URL + "/ibm.png"
                                        }
                                        alt="ibm-logo"
                                    />
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            At IBM, work is more than a job -
                                            it&apos;s a calling: To build. To
                                            design. To code. To consult. To
                                            think along with clients and sell.
                                            To make markets. To invent. To
                                            collaborate. Not just to do
                                            something better, but to attempt
                                            things you&apo;ve never thought
                                            possible. To lead in this new era of
                                            technology and solve some of the
                                            world&apos;s most challenging
                                            problems. IBM is a leading cloud
                                            platform and cognitive solutions
                                            company. Restlessly reinventing
                                            since 1911, we are the largest
                                            technology and consulting employer
                                            in the world, with more than 350,000
                                            employees serving clients in 170
                                            countries. With Watson, the AI
                                            platform for business, powered by
                                            data, we are building industry-based
                                            solutions to real-world problems.
                                            For more than seven decades, IBM
                                            Research has defined the future of
                                            information technology with more
                                            than 3,000 researchers in 12 labs
                                            located across six continents.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

About.displayName = "About";
export default About;
