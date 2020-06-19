import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap",
        overflow: "auto"
    },
    row: {
        flex: "1 1 100%"
    },
    column: {},
    content: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    header: {
        width: "100%",
        textAlign: "center",
        verticalAlign: "text-top"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function About() {
    document.title = "About Us";
    const classes = useStyles(Theme);
    const headers = ["CISL", "IBM", "RPI", "Contributors"];

    const output = (headerContent, bodyContent, index) => (
        <div className={clsx(classes.pad)} key={index}>
            <Typography color="secondary" variant="h2">
                {headerContent}
            </Typography>
            <Divider />
            <Typography
                color="secondary"
                align="justify"
                paragraph
                gutterBottom
                className={clsx(classes.pad)}
            >
                {bodyContent}
            </Typography>
        </div>
    );

    const lorem =
        "Lorem ipsum dolor sit amet, est no ludus repudiandae. Augue vidisse in vix, consul intellegam no vis, pro ornatus partiendo vulputate an. Eleifend qualisque no pro. Ei soluta percipit usu. Cu vocent blandit mei. In sea soleat doming, in soluta invidunt omittantur sea. Meis adhuc imperdiet his an. Id quis nibh saperet sed, te mea velit patrioque scriptorem. Qui laoreet reprimique eu, no duis virtute his. Ex graecis scriptorem omittantur est. Cu nusquam lucilius sit, ut tale eirmod epicurei eam. Ne labore indoctum appellantur vix. Cu mel quis sensibus assueverit, putant euripidis ut pro. His blandit adolescens adversarium te, ne congue omittam mel. Vel ut unum aperiam explicari. Officiis evertitur intellegam pri ne, mea eu convenire mnesarchum. An has tale fabulas scribentur. Abhorreant intellegebat te quo, ne pro inani repudiandae consectetuer, duo eu falli doming mnesarchum. Aperiam ocurreret usu no, denique accusata eloquentiam ei quo. Has augue quaerendum ad. Nam ut nemore animal commune, movet urbanitas id duo, sale discere tractatos te vix. Sit tempor dolorum an, sed aperiri ponderum eloquentiam at. Ad oportere cotidieque eos, persius vocibus rationibus has no. Id erat ancillae consequat quo, ut vis case sadipscing. In mei ludus cotidieque vituperatoribus, pri te vero recteque pertinacia. Te percipitur assueverit vis, eu tation aperiam qui, iriure latine sed et. Tation iriure corpora ius ne, eum probo oratio eu.";

    return (
        <div className={clsx(classes.root)}>
            {headers.map((h, index) => output(h, lorem, index))}
        </div>
    );
}

About.displayName = "About";
export default About;
