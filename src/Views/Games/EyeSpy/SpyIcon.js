import PropType from "prop-types";
import React from "react";
// import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Card } from "../../../Components/Card";
// import Typography from "@material-ui/core/Typography";
// import ToneTrainerComponent from "../../Tools/ToneTrainerView/ToneTrainerComponent";
// import {translate} from "../../../CloudFunctions";
// import { CircularProgress, IconButton } from "@material-ui/core";
// import { RecordVoiceOver } from "@material-ui/icons";
// import { translate } from "../../../CloudFunctions/Translate";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    content: {
        width: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    column: {
        flex: "1 1 100%",
        display: "flex",
        flexFlow: "column noWrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function SpyIcon({ poi, parsedConfigs, setConfig, setPoiCard }) {
    const { type, sceneId } = poi;

    const classes = useStyles(Theme);

    // const [sample, setSample] = useState({});

    // const [loading, setLoading] = useState(false);
    // const [trainerOpen, setTrainerOpen] = useState(false);
    // const [text, setText] = useState("");

    // useEffect(() => {
    //     // setLanguage(language)
    //     if (type === "vocab") {setText(title)}
    // }, [poi]);

    // useEffect(() => {
    //     text.length && translateText()
    // }, [text])

    // async function translateText() {
    //     setLoading(true);
    //     return await Promise.resolve(translate(text, language.code))
    //         .then(s => setSample(s))
    //         .finally(() => setLoading(false));
    // }

    const getOnOpen = () => {
        if (type === "waypoint" && sceneId) {
            var index = parsedConfigs.findIndex(function(item) {
                return item.name === sceneId;
            });
            return setConfig(parsedConfigs[index]);
        }
        setPoiCard(poi);
    };

    // const getTitle = () => {
    //     return (
    //         title && (
    //             <div className={clsx(classes.content)}>
    //                 <div className={clsx(classes.column)}>
    //                     <div className={clsx(classes.pad)}>
    //                         <Typography style={{marginRight: "36px", marginLeft: "36px"}} variant="h6">{title}</Typography>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     );
    // };

    // const getBody = () => {
    //     return (
    //         true && (
    //             <div className={clsx(classes.content)}>
    //                 <div className={clsx(classes.column)}>
    //                     <div className={clsx(classes.pad)}>
    //                         {/* <Typography variant="h6">{body}</Typography> */}
    //                         {loading ?
    //                             <div className={clsx(classes.row)}>
    //                                 <div className={clsx(classes.pad)}>
    //                                     <CircularProgress color="primary" />
    //                                 </div>
    //                             </div>
    //                         :
    //                         (sample &&
    //                         <>
    //                             <Typography variant="h6">{sample["translation"]}</Typography>
    //                             <IconButton onClick={() => setTrainerText(title)}>
    //                                 <RecordVoiceOver />
    //                             </IconButton>
    //                         </>
    //                         )}

    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     );
    // };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Card
                    darkMode={true}
                    // title={getTitle}
                    // body={getBody}
                    icon={type}
                    onOpen={getOnOpen}
                    stayClosed={type === "waypoint"}
                />
            </div>
        </div>
    );
}
SpyIcon.displayName = "SpyIcon";
SpyIcon.propTypes = {
    poi: PropType.any,
    parsedConfigs: PropType.any,
    setConfig: PropType.any,
    setPoiCard: PropType.any
};

export default SpyIcon;
