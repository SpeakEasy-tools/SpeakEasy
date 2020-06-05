import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Theme} from "../../../utils";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        overflowY: 'scroll',
    },
    row: {
        flex: '1 1 100%'
    },
    column: {},
    content: {
        width:"100%",
        display: 'flex',
        flexDirection: 'column',
    },
    header:{
        width:"100%",
        textAlign: 'center',
        verticalAlign: 'text-top',
    },
    pad: {
        margin: theme.spacing(1),
        flex: '1 1 100px',
    },
}));

export default () => {
    document.title = "About Us";
    const classes = useStyles(Theme);
    const headers = ["CISL", "IBM", "RPI", "Contributors"];
    const output = headers.map(item =>
        <>
        <div className={clsx(classes.header)}>
            <Typography variant="h2"> {item} </Typography>
        </div>
        <div className={clsx(classes.content)}>
            <Typography variant="body1">
            Lorem ipsum dolor sit amet, est no ludus repudiandae. Augue vidisse in vix, consul intellegam no vis, pro ornatus partiendo vulputate an. Eleifend qualisque no pro. Ei soluta percipit usu. Cu vocent blandit mei.
            In sea soleat doming, in soluta invidunt omittantur sea. Meis adhuc imperdiet his an. Id quis nibh saperet sed, te mea velit patrioque scriptorem. Qui laoreet reprimique eu, no duis virtute his. Ex graecis scriptorem omittantur est.
            Cu nusquam lucilius sit, ut tale eirmod epicurei eam. Ne labore indoctum appellantur vix. Cu mel quis sensibus assueverit, putant euripidis ut pro. His blandit adolescens adversarium te, ne congue omittam mel. Vel ut unum aperiam explicari.
            Officiis evertitur intellegam pri ne, mea eu convenire mnesarchum. An has tale fabulas scribentur. Abhorreant intellegebat te quo, ne pro inani repudiandae consectetuer, duo eu falli doming mnesarchum. Aperiam ocurreret usu no, denique accusata eloquentiam ei quo. Has augue quaerendum ad. Nam ut nemore animal commune, movet urbanitas id duo, sale discere tractatos te vix. Sit tempor dolorum an, sed aperiri ponderum eloquentiam at.
            Ad oportere cotidieque eos, persius vocibus rationibus has no. Id erat ancillae consequat quo, ut vis case sadipscing. In mei ludus cotidieque vituperatoribus, pri te vero recteque pertinacia. Te percipitur assueverit vis, eu tation aperiam qui, iriure latine sed et. Tation iriure corpora ius ne, eum probo oratio eu. 
            </Typography>
        </div>
        </>);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                />
            </div>
        <div className={clsx(classes.header)}>
            <Typography variant="h1"> About Us </Typography>
        </div>
        {output}
        </div>
    )
}