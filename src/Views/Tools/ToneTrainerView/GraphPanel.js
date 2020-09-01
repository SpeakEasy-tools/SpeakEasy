import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Hearing } from "@material-ui/icons";
import {
    arrayBufferFromUrl,
    getF0,
    minMaxScale
} from "../../../FeatureExtraction";
import { LoadingBar } from "../../../Components/LoadingBar";
import { removeNulls } from "../../../FeatureExtraction/AudioProcessing";
import {
    AreaChart,
    CartesianGrid,
    Label,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import Area from "recharts/lib/cartesian/Area";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.main
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: theme.palette.primary.light
    },

    row: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark,
        justifyContent: "center",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    button: {
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        color: theme.palette.secondary.main
    }
}));

function GraphPanel({ example, attempt }) {
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("Tone Graph");

    const [language, setLanguage] = useState(null);

    const [transcript, setTranscript] = useState(null);
    const [translation, setTranslation] = useState(null);

    const [exampleUrl, setExampleUrl] = useState("");
    const [attemptUrl, setAttemptUrl] = useState("");

    const [exampleF0, setExampleF0] = useState(null);

    async function processSample(sampleUrl) {
        const results = {};
        setIsLoading(true);
        setLoadingLabel("Audio buffer");

        return await Promise.resolve(
            arrayBufferFromUrl(sampleUrl).then(buffer =>
                getF0(buffer)
                    .then(f0 => removeNulls(f0))
                    .then(results => [
                        minMaxScale(results[0]),
                        minMaxScale(results[1])
                    ])
                    .then(r =>
                        r[0].map((v, i) => {
                            return {
                                example:
                                    Math.round(v * 100 + Number.EPSILON) / 100,
                                t:
                                    Math.round(r[1][i] * 100 + Number.EPSILON) /
                                    100
                            };
                        })
                    )
                    .then(f0 => (results["f0"] = f0))
                    .then(() => setIsLoading(false))
            )
        ).then(() => results);
    }

    useEffect(() => {
        if (transcript === attemptUrl && attemptUrl === "nope") {
            console.log(attemptUrl, transcript);
        }
    }, [attemptUrl, transcript]);
    useEffect(() => {
        if (example && Boolean(Object.keys(example).length)) {
            if ("transcript" in example) {
                setTranscript(example.transcript);
            }
            if ("translation" in example) {
                setTranslation(example.translation);
            }
            if ("url" in example) {
                setExampleUrl(example.url);
            }
            if ("language" in example) {
                setLanguage(example.language);
            }
        }
    }, [example]);

    useEffect(() => {
        if (attempt && Boolean(Object.keys(attempt).length)) {
            if ("url" in example) {
                setAttemptUrl(example.url);
            }
        }
    }, [attempt, example]);

    useEffect(() => {
        if (exampleUrl) {
            Promise.resolve(processSample(exampleUrl)).then(sample =>
                setExampleF0(sample.f0)
            );
        }
    }, [exampleUrl]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        align="center"
                    >
                        {language &&
                            Boolean(Object.keys(language).length) &&
                            language.name}
                    </Typography>
                    <Typography variant="h6" color="primary" align="center">
                        {translation ? translation : ""}
                    </Typography>
                </div>
                {exampleUrl &&
                    typeof exampleUrl === "string" &&
                    Boolean(exampleUrl.length) && (
                        <div className={clsx(classes.pad)}>
                            <IconButton
                                className={clsx(classes.button)}
                                onClick={() => {
                                    const audio = new Audio();
                                    audio.src = exampleUrl;
                                    audio.play().then();
                                }}
                            >
                                <Hearing className={clsx(classes.icon)} />
                            </IconButton>
                        </div>
                    )}
            </div>
            <div className={clsx(classes.row)} style={{ flex: "1 1 100%" }}>
                <div
                    className={clsx(classes.column)}
                    style={{
                        width: "auto",
                        height: "90%",
                        margin: Theme.spacing(1),
                        padding: Theme.spacing(1),
                        backgroundColor: Theme.palette.primary.light
                    }}
                >
                    <ResponsiveContainer>
                        <AreaChart
                            data={exampleF0}
                            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <Legend verticalAlign="top" />
                            <XAxis
                                type="number"
                                domain={[0, 1]}
                                allowDataOverflow
                                dataKey="t"
                            >
                                <Label offset={0} position="insideBottom">
                                    Time
                                </Label>
                            </XAxis>
                            <YAxis
                                type="number"
                                domain={[0, 1]}
                                label={{
                                    value: "F0",
                                    angle: -90,
                                    position: "insideLeft"
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="example"
                                stroke={Theme.palette.secondary.main}
                                fill={Theme.palette.secondary.light}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

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

GraphPanel.displayName = "GraphPanel";
GraphPanel.propTypes = {
    example: PropTypes.object.isRequired,
    attempt: PropTypes.object
};
export default GraphPanel;
