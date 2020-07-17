import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Tile from "./Tile";

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        width: "100%",
        display: "flex"
    },
    pad: {
        padding: theme.spacing(1),
        border: `1px solid ${theme.palette.secondary.light}`,
        flex: "1 1 auto",
        width: "90px",
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

function Square({ vals, squareId, handleClick }) {
    const classes = useStyles(Theme);

    const handleTileClick = (tileId, e) => {
        return handleClick(squareId, tileId, e);
    };

    useEffect(() => {}, [vals]);
    return (
        <div className={clsx(classes.root)}>
            {vals.map((v, i) => (
                <div key={`${squareId}_${i}`} className={clsx(classes.row)}>
                    {v.map(t => (
                        <div
                            key={t.id}
                            className={clsx(classes.pad)}
                            onClick={e =>
                                handleTileClick(t.id, e.currentTarget)
                            }
                        >
                            <Tile {...t} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

Square.displayName = "Square";
Square.propTypes = {
    vals: PropTypes.array.isRequired,
    squareId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};
export default Square;
