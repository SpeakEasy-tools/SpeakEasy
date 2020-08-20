import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getRandomColor, Theme } from "../../../utils";
import clsx from "clsx";
import { GetCocoAnnotationsByImageId } from "../../../Queries";
import { getTranslations } from "../../../CloudFunctions/Translate";
import ClickableImage from "./ClickableImage";
import { LoadingBar } from "../../../Components/LoadingBar";
import SegmentsPanel from "./SegmentsPanel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 10
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: Theme.palette.secondary.dark
    },
    row: {
        display: "flex",
        width: "auto",
        height: "auto",
        flexFlow: "row noWrap",
        overflow: "hidden",
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

function ImagePanel({ image, language }) {
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("Image");

    const [imageId, setImageId] = useState(null);
    const annotationParams = {
        imageId: imageId
    };

    const cocoAnnotations = GetCocoAnnotationsByImageId(annotationParams);

    const [annotations, setAnnotations] = useState([]);

    const [captionHashes, setCaptionHashes] = useState([]);
    const [captions, setCaptions] = useState({});

    const [segmentHashes, setSegmentHashes] = useState([]);
    const [segments, setSegments] = useState({});

    const [translations, setTranslations] = useState({});
    const [found, setFound] = useState({});

    function handleFound(key) {
        if (!(key in found)) {
            setFound(prevState => {
                return { ...prevState, [key]: true };
            });
        }
    }

    function getCaption() {
        if (captions && Boolean(Object.keys(captions).length)) {
            return captions[Object.keys(captions)[0]].translation;
        } else {
            return "";
        }
    }

    useEffect(() => {
        if (image && Boolean(Object.keys(image).length)) {
            setImageId(image.id);
        }
    }, [image]);
    useEffect(() => {
        if (
            cocoAnnotations &&
            Boolean(Object.keys(cocoAnnotations).length) &&
            cocoAnnotations.annotations &&
            !cocoAnnotations.loading &&
            cocoAnnotations.count
        ) {
            setIsLoading(false);
            setAnnotations(cocoAnnotations.annotations);
        } else if (
            cocoAnnotations &&
            Boolean(Object.keys(cocoAnnotations).length) &&
            cocoAnnotations.loading
        ) {
            setIsLoading(true);
            setLoadingLabel("Image annotations");
        }
    }, [cocoAnnotations]);
    useEffect(() => {
        function translate(transcript, languageCode) {
            setIsLoading(true);
            setLoadingLabel("Translating annotations");
            let transcripts = new Set();
            let keys = {};
            let results = {};
            Object.entries(transcript).forEach(([k, v]) => {
                if (keys && Boolean(Object.keys(keys))) {
                    if (!(v in keys)) {
                        keys[v] = [];
                    }
                    keys[v] = [...keys[v], k];
                }
                transcripts.add(v);
            });
            Promise.resolve(
                getTranslations([...transcripts], languageCode).then(result =>
                    result.forEach(r => {
                        keys[r["transcript"]].forEach(k => (results[k] = r));
                        results[keys[r["transcript"]]] = r;
                    })
                )
            ).finally(() => {
                setTranslations({ ...results });
                setIsLoading(false);
            });
        }

        if (
            annotations &&
            Boolean(annotations.length) &&
            language &&
            language.code
        ) {
            let transcripts = {};
            let caps = [];
            let segs = [];

            setIsLoading(true);
            setLoadingLabel("Captions and objects");
            annotations.forEach(a => {
                const annotation = JSON.parse(a["annotation"]);
                let color = getRandomColor();
                let cont = true;
                while (cont) {
                    if (!(color in transcripts)) {
                        cont = false;
                    }
                }
                if ("caption" in annotation) {
                    transcripts[color] = annotation["caption"];
                    caps.push(color);
                } else if (
                    "segmentation" in annotation &&
                    Array.isArray(annotation["segmentation"])
                ) {
                    transcripts[
                        color
                    ] = `${a["coco_category"]["supercategory"]} - ${a["coco_category"]["name"]}`;
                    segs.push({
                        color: color,
                        segments: annotation["segmentation"]
                    });
                }
            });
            translate(transcripts, language.code);
            setCaptionHashes([...caps]);
            setSegmentHashes([...segs]);
        }
    }, [annotations, language]);
    useEffect(() => {
        if (
            captionHashes &&
            Boolean(captionHashes.length) &&
            segmentHashes &&
            Boolean(segmentHashes.length) &&
            translations &&
            Boolean(Object.keys(translations).length)
        ) {
            setIsLoading(true);
            setLoadingLabel("Annotation translations");
            let caps = {};
            let segs = {};
            Object.entries(captionHashes).forEach(([, v]) => {
                caps[v] = { ...translations[v], color: v };
            });
            Object.entries(segmentHashes).forEach(([, v]) => {
                segs[v.color] = {
                    ...translations[v.color],
                    color: v.color,
                    segments: v.segments,
                    isFound: false
                };
            });
            setCaptions({ ...caps });
            setSegments({ ...segs });
        }
    }, [captionHashes, segmentHashes, translations]);

    return (
        <div className={clsx(classes.root)}>
            {image &&
                segments &&
                Boolean(Object.keys(segments).length) &&
                found && (
                    <>
                        <div className={clsx(classes.column)}>
                            {captions && (
                                <div className={clsx(classes.pad)}>
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        align="center"
                                    >
                                        {getCaption()}
                                    </Typography>
                                </div>
                            )}
                            <div className={clsx(classes.pad)}>
                                <SegmentsPanel
                                    segments={segments}
                                    found={found}
                                />
                            </div>
                        </div>
                        <div className={clsx(classes.column)}>
                            <div className={clsx(classes.pad)}>
                                <ClickableImage
                                    image={image}
                                    segments={segments}
                                    found={found}
                                    handleFound={handleFound}
                                />
                            </div>
                        </div>
                    </>
                )}
            {isLoading && (
                <div className={clsx(classes.row)}>
                    <div
                        className={clsx(classes.pad)}
                        style={{ flex: "1 1 100%" }}
                    >
                        <LoadingBar label={loadingLabel} />
                    </div>
                </div>
            )}
        </div>
    );
}

ImagePanel.displayName = "ImagePanel";
ImagePanel.propTypes = {
    image: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired
};
export default ImagePanel;
