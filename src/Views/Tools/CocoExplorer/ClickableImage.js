import PropTypes from "prop-types";
import React, { createRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { rgbToHex, Theme } from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        position: "relative",
        display: "flex",
        flexFlow: "column noWrap",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 10,
        border: `2px solid ${theme.palette.primary.main}`
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    canvas: {
        borderRadius: 10
    },
    hit: { display: "none" },
    image: { display: "none" }
}));

function ClickableImage({ image, segments, found, handleFound }) {
    const classes = useStyles(Theme);

    const [canvasRef, setCanvasRef] = useState(null);
    const [hitRef, setHitRef] = useState(null);

    useEffect(() => {
        setCanvasRef(createRef());
        setHitRef(createRef());
    }, []);
    useEffect(() => {
        if (
            canvasRef &&
            canvasRef.current &&
            hitRef &&
            hitRef.current &&
            segments &&
            handleFound
        ) {
            const hitContext = hitRef.current.getContext("2d");
            canvasRef.current.onclick = function(e) {
                const mousePosition = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                const pixel = hitContext.getImageData(
                    mousePosition.x,
                    mousePosition.y,
                    1,
                    1
                ).data;
                const color = rgbToHex(pixel[0], pixel[1], pixel[2]);
                if (color in segments) {
                    handleFound(color);
                }
            };
        }
    }, [canvasRef, hitRef, segments, handleFound]);
    useEffect(() => {
        if (
            image &&
            image["metadata"] &&
            canvasRef &&
            canvasRef.current &&
            hitRef &&
            hitRef.current &&
            segments &&
            Boolean(Object.keys(segments).length) &&
            found
        ) {
            const newImage = new Image();

            const canvasContext = canvasRef.current.getContext("2d");
            const hitContext = hitRef.current.getContext("2d");

            canvasRef.current.width = image["metadata"]["width"];
            canvasRef.current.height = image["metadata"]["height"];
            hitRef.current.width = image["metadata"]["width"];
            hitRef.current.height = image["metadata"]["height"];
            newImage.src = image["metadata"]["coco_url"];
            newImage.onload = function() {
                canvasContext.drawImage(
                    newImage,
                    0,
                    0,
                    image["metadata"]["width"],
                    image["metadata"]["height"],
                    0,
                    0,
                    image["metadata"]["width"],
                    image["metadata"]["height"]
                );

                Object.entries(segments).forEach(([k, v]) => {
                    if (v["segments"].length > 1) {
                        return;
                    }
                    const path = v["segments"][0];
                    const color = k;
                    canvasContext.strokeStyle = color;
                    canvasContext.lineWidth = 4;
                    hitContext.fillStyle = color;
                    canvasContext.beginPath();
                    hitContext.beginPath();
                    canvasContext.moveTo(path[0], path[1]);
                    hitContext.moveTo(path[0], path[1]);
                    for (let i = 2; i < path.length; i += 2) {
                        canvasContext.lineTo(path[i], path[i + 1]);
                        hitContext.lineTo(path[i], path[i + 1]);
                    }

                    canvasContext.closePath();
                    hitContext.closePath();
                    if (k in found) {
                        canvasContext.stroke();
                    }
                    hitContext.fill();
                });
            };
        }
    }, [image, canvasRef, hitRef, segments, found]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <canvas ref={canvasRef} className={clsx(classes.canvas)} />
                <canvas ref={hitRef} className={clsx(classes.hit)} />
            </div>
        </div>
    );
}

ClickableImage.displayName = "ClickableImage";
ClickableImage.propTypes = {
    image: PropTypes.object.isRequired,
    segments: PropTypes.object.isRequired,
    found: PropTypes.object.isRequired,
    handleFound: PropTypes.func.isRequired
};
export default ClickableImage;
