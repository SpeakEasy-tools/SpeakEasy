import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components";
import { SearchBar } from "../../../Components/SearchBar";
import ToneTrainerComponent from "./ToneTrainerComponent";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    row: {
        flex: "1 1 100%",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    }
}));

function ToneTrainerView() {
    document.title = "Tone Trainer";
    const classes = useStyles(Theme);
    const [results, setResults] = useState({});
    const [sample, setSample] = useState({});
    useEffect(() => {
        if (results && "audioUrl" in results) {
            setSample({ ...results });
        }
    }, [results]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper />
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <SearchBar results={setResults} />
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <ToneTrainerComponent sample={sample} />
                </div>
            </div>
        </div>
    );
}

ToneTrainerView.displayName = "ToneTrainerView";
export default ToneTrainerView;
