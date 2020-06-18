import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(() => ({
    root: {},
    column: {},
    pad: {}
}));

const boardSizes = [
    { size: "12" },
    { size: "24" },
    { size: "36" },
    { size: "48" }
];

function Settings({ boardSize, setBoardSize }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id="board-size-select"
                        options={boardSizes}
                        value={boardSize}
                        getOptionLabel={option => option.size}
                        style={{ width: 150 }}
                        onChange={(e, v) => setBoardSize(v)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Select board size"
                                margin="none"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
Settings.displayName = "Settings";
Settings.propTypes = {
    language: PropTypes.any,
    setLanguage: PropTypes.any,
    boardSize: PropTypes.any,
    setBoardSize: PropTypes.any
};
export default Settings;
