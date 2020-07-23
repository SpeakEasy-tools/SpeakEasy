import PropType from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Card } from "../../../Components";
import Typography from "@material-ui/core/Typography";

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

function SpyCard({ poi, parsedConfigs, setConfig }) {
    const { type, title, body, sceneId } = poi;

    const classes = useStyles(Theme);

    const getOnOpen = () => {
        if (type === "waypoint" && sceneId) {
            var index = parsedConfigs.findIndex(function(item) {
                return item.name === sceneId;
            });
            setConfig(parsedConfigs[index]);
        }
    };

    const getTitle = () => {
        return (
            title && (
                <div className={clsx(classes.content)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography variant="h6">{title}</Typography>
                        </div>
                    </div>
                </div>
            )
        );
    };

    const getBody = () => {
        return (
            body && (
                <div className={clsx(classes.content)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography variant="h6">{body}</Typography>
                        </div>
                    </div>
                </div>
            )
        );
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Card
                    darkMode={true}
                    title={getTitle}
                    body={getBody}
                    icon={type}
                    onOpen={getOnOpen}
                    stayClosed={type === "waypoint"}
                />
            </div>
        </div>
    );
}
SpyCard.displayName = "SpyCard";
SpyCard.propTypes = {
    poi: PropType.any,
    parsedConfigs: PropType.any,
    setConfig: PropType.any
};
export default SpyCard;
