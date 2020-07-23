import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ControlBar } from "../../../Components";
import Instructions from "./Instructions";


const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap"
    },
    bottomLeftPanel: {
        borderBottomLeftRadius: 200,
        width: 100,
        backgroundColor: 'red',
        height: 100
    }, 
    bottomRightPanel: {
        borderBottomRightRadius: 200,
        width: 100,
        backgroundColor: 'yellow',
        height: 100
    },
    topLeftPanel: {
        borderTopLeftRadius: 200,
        width: 100,
        backgroundColor: 'blue',
        height: 100
    },
    topRightPanel: {
        borderTopRightRadius: 200,
        width: 100,
        backgroundColor: 'green ',
        height: 100
    } 
}));

function Simon() {
    document.title = "Simon";
    const classes = useStyles(Theme);
    const instructions = Instructions();

    const [language, setLanguage] = useState(null);

    const getInstructions = () => {
        console.log(language);
        return instructions;
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <ControlBar
                    updateLanguage={setLanguage}
                    instructions={getInstructions}
                />
            </div>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    {language && language.name && (
                        <p>EXAMPLE TEXT</p>
                    )}
                </div>
            </div>
        </div>
    );
}

Simon.displayName = "Simon";
export default Simon;
