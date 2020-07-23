import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getRandomColor, Theme } from "../../../utils";
import clsx from "clsx";
import { GetCocoAnnotationsByImageId } from "../../../Queries";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getTranslations } from "../../../CloudFunctions/Translate";
import CaptionsPanel from "./CaptionsPanel";
import SegmentsPanel from "./SegmentsPanel";
import ClickableImage from "./ClickableImage";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        background: theme.palette.secondary.light,
        border: `5px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px",
        display: "flex",
        flexFlow: "column noWrap",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(1)
    },
    row: {
        flex: "1 1 auto",
        width: "98%",
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(1)
    },
    pad: {
        padding: theme.spacing(1),
        border: `5px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px"
    }
}));

function ImagePanel({ image, language }) {
    const classes = useStyles(Theme);

    const [translating, setTranslating] = useState(false);
    const [imageId, setImageId] = useState(null);

    const { annotations, loading } = GetCocoAnnotationsByImageId({
        imageId: imageId
    });

    const [translations, setTranslations] = useState({});

    const [captionHashes, setCaptionHashes] = useState([]);
    const [segmentHashes, setSegmentHashes] = useState([]);

    const [captions, setCaptions] = useState({});
    const [segments, setSegments] = useState({});

    const [found, setFound] = useState({});

    function handleFound(key) {
        if (!(key in found)) {
            setFound(prevState => {
                return { ...prevState, [key]: true };
            });
        }
    }

    useEffect(() => {
        function translate(transcript, languageCode) {
            setTranslating(true);
            let transcripts = [];
            let keys = [];
            let results = {};
            Object.entries(transcript).forEach(([k, v]) => {
                keys.push(k);
                transcripts.push(v);
            });
            Promise.resolve(
                getTranslations(transcripts, languageCode).then(result =>
                    result.forEach((r, i) => {
                        results[keys[i]] = r;
                    })
                )
            ).finally(() => {
                setTranslations({ ...results });
                setTranslating(false);
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
        if (image) {
            setImageId(image["id"]);
        }
    }, [image]);
    useEffect(() => {
        console.log(language);
    }, [language]);
    useEffect(() => {
        console.log(translations, translating);
    }, [translations, translating]);
    useEffect(() => {
        if (
            captionHashes &&
            Boolean(captionHashes.length) &&
            segmentHashes &&
            Boolean(segmentHashes.length) &&
            translations &&
            Boolean(Object.keys(translations).length)
        ) {
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
            <div className={clsx(classes.row)}>
                {loading ? (
                    <div className={clsx(classes.pad)}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    translating && (
                        <div className={clsx(classes.pad)}>
                            <CircularProgress color="secondary" />
                        </div>
                    )
                )}
            </div>
            {!loading && (
                <div className={clsx(classes.row)}>
                    {captions && Boolean(Object.keys(captions).length) && (
                        <CaptionsPanel captions={captions} />
                    )}
                    {image &&
                        segments &&
                        Boolean(Object.keys(segments).length) && (
                            <ClickableImage
                                image={image}
                                segments={segments}
                                found={found}
                                handleFound={handleFound}
                            />
                        )}
                    {segments && Boolean(Object.keys(segments).length) && (
                        <SegmentsPanel segments={segments} found={found} />
                    )}
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
