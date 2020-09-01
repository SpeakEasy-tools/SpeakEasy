import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        display: "flex",
        flexFlow: "column noWrap",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        overflow: "auto",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    row: {
        width: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
        borderRadius: 10
    },
    title: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

function Key({ tiles, language }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.content)}>
            <div className={clsx(classes.row, classes.title)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h6" color="primary" align="center">
                        Cards
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        align="justify"
                    >
                        The words in the list below have been translated to{" "}
                        {language} and shuffled into a deck of cards. Your goal
                        is to find a matching pair of cards for each word. Only
                        two cards can be flipped face up at a time. If two cards
                        are flipped and they are a match, the are removed from
                        play and are left face up.
                    </Typography>
                </div>
            </div>
            {tiles && Boolean(tiles.length) && (
                <div
                    style={{
                        flex: "1 1 100%",
                        width: "auto",
                        height: "auto",
                        display: "flex",
                        margin: Theme.spacing(1),
                        padding: Theme.spacing(1),
                        backgroundColor: Theme.palette.secondary.dark,
                        borderRadius: 10
                    }}
                >
                    <div
                        style={{
                            flex: "1 1 100%",
                            width: "auto",
                            height: "auto",
                            display: "flex",
                            flexFlow: "row wrap",
                            margin: Theme.spacing(1),
                            padding: Theme.spacing(1),
                            backgroundColor: Theme.palette.secondary.main,
                            borderRadius: 10
                        }}
                    >
                        {[...tiles]
                            .sort(
                                (a, b) =>
                                    -b["transcript"].localeCompare(
                                        a["transcript"]
                                    )
                            )
                            .map(t => (
                                <div
                                    key={`${t.id}_key`}
                                    style={{
                                        flex: "1 1 20%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: Theme.spacing(1),
                                        padding: Theme.spacing(1),
                                        backgroundColor:
                                            Theme.palette.secondary.light,
                                        border: `2px solid ${t.color}`,
                                        borderRadius: 10
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <Checkbox
                                            style={{ color: t.color }}
                                            checked={t.isMatched}
                                        />
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="center"
                                        >
                                            {t.transcript}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

Key.displayName = "Key";
Key.propTypes = {
    tiles: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired
};
export default Key;
