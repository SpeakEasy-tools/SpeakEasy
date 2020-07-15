import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { Translate } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
    root: {}
}));

function Flashcard({ front, back }) {
    const classes = useStyles(Theme);

    const [flipped, setFlipped] = useState(false);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    {flipped ? (
                        <Typography variant="subtitle1" color="primary">
                            {back}
                        </Typography>
                    ) : (
                        <Typography variant="subtitle1" color="primary">
                            {front}
                        </Typography>
                    )}
                </div>
                <div className={clsx(classes.pad)}>
                    <IconButton onClick={setFlipped(prevState => !prevState)}>
                        <Translate />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
Flashcard.displayName = "Flashcard";
Flashcard.propTypes = {
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired
};
export default Flashcard;
