import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.secondary.light,
        border: `5px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px",
        textAlign: "center"
    },
    row: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1),
        flex: "1 1 auto"
    },
    image: {
        width: 150,
        height: "auto",
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px"
    },
    selected: {
        boxShadow: `0px 0px 10px ${theme.palette.primary.light}`
    }
}));

function GalleryPanel({ images, setSelectedImage }) {
    const classes = useStyles(Theme);

    const [clickedImage, setClickedImage] = useState(null);

    function handleClick(i) {
        setClickedImage(i);
        setSelectedImage(images[i]);
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                {images &&
                    images.map((image, index) => (
                        <div key={index} className={clsx(classes.pad)}>
                            <img
                                src={image["metadata"]["coco_url"]}
                                onClick={() => handleClick(index)}
                                className={clsx(classes.image, {
                                    [classes.selected]: index === clickedImage
                                })}
                                alt={`coco-gallery-index-${index}`}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

GalleryPanel.displayName = "GalleryPanel";
GalleryPanel.propTypes = {
    images: PropTypes.array.isRequired,
    setSelectedImage: PropTypes.func.isRequired
};
export default GalleryPanel;
