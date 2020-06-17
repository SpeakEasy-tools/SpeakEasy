import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import { GetModules } from "../../../Queries";
import "jsoneditor/dist/jsoneditor.css";
import "../../../utils/darktheme.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ConfigsPanel from "./ConfigsPanel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "auto",
        height: "90%",
        backgroundColor: theme.palette.primary.dark
    },
    content: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "row noWrap"
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    button: {
        "&:disabled": {
            backgroundColor: theme.palette.error.main
        }
    }
}));

function ModulesPanel() {
    document.title = "Insert Config";
    const classes = useStyles(Theme);

    const [modules] = GetModules();

    const [moduleTabIndex, setModuleTabIndex] = useState(0);

    const handleModuleTabChange = (e, v) => {
        setModuleTabIndex(v);
    };

    return (
        <div className={clsx(classes.content)}>
            <div
                className={clsx(classes.column)}
                style={{
                    backgroundColor: Theme.palette.secondary.light,
                    color: Theme.palette.secondary.contrastText
                }}
            >
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant="h4" color="primary">
                            Modules
                        </Typography>
                    </div>
                </div>
                <Tabs
                    value={moduleTabIndex}
                    onChange={handleModuleTabChange}
                    variant="scrollable"
                    orientation="vertical"
                >
                    {modules &&
                        modules.map(m => (
                            <Tab
                                key={m.id}
                                label={m.name}
                                style={{
                                    borderTop: `1px solid ${Theme.palette.secondary.contrastText}`
                                }}
                            />
                        ))}
                </Tabs>
            </div>
            {modules && modules.length > moduleTabIndex && (
                <ConfigsPanel
                    moduleName={modules[moduleTabIndex].name}
                    moduleId={modules[moduleTabIndex].id}
                />
            )}
        </div>
    );
}

ModulesPanel.displayName = "ModulesPanel";
export default ModulesPanel;
