import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { SearchBar } from "../../../Components";
import ToneTrainerComponent from "../ToneTrainerView/ToneTrainerComponent";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    content: {
        padding: theme.spacing(1),
        flex: "1 1 100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function Dictionary() {
    document.title = "Dictionary";
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

Dictionary.displayName = "Dictionary";
export default Dictionary;
