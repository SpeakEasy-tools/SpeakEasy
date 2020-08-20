import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";

import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 10
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10
    },
    row: {
        flex: 1,
        display: "flex",
        width: "auto",
        height: "auto",
        flexFlow: "row wrap",
        overflow: "hidden",
        justifyContent: "start",
        alignItems: "center",
        borderRadius: 10,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1)
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

function SegmentsPanel({ segments, found }) {
    const classes = useStyles(Theme);

    const [categories, setCategories] = useState({});

    useEffect(() => {
        if (segments && Boolean(Object.keys(segments).length)) {
            let keys = {};
            Object.keys(segments).forEach(s => {
                if (!(segments[s].transcript in keys)) {
                    keys[segments[s].transcript] = {
                        translation: segments[s].translation,
                        segments: []
                    };
                }
                keys[segments[s].transcript]["segments"] = [
                    ...keys[segments[s].transcript]["segments"],
                    segments[s]
                ];
            });
            setCategories(keys);
        }
    }, [segments]);

    return (
        <div className={clsx(classes.root)}>
            {Object.keys(categories).map(s => (
                <div key={s} className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        {categories[s].translation}
                    </div>
                    {categories[s].segments.map(c => {
                        return (
                            <Checkbox
                                key={c.color}
                                checked={c.color in found}
                                style={{ color: c.color }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

SegmentsPanel.displayName = "SegmentsPanel";
SegmentsPanel.propTypes = {
    segments: PropTypes.object.isRequired,
    found: PropTypes.object.isRequired
};
export default SegmentsPanel;
