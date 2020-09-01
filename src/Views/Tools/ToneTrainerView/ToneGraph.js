import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Label,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import { arrayBufferFromUrl } from "../../../FeatureExtraction";
import { getF0, minMaxScale } from "../../../FeatureExtraction";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        width: "90%",
        height: 400
    },
    row: {
        flex: "1 1 100%",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    }
}));

function ToneGraph({ example, attempt }) {
    const classes = useStyles(Theme);
    const [loading, setLoading] = useState(false);
    const [exampleBuffer, setExampleBuffer] = useState([]);
    const [exampleF0, setExampleF0] = useState([]);
    const [attemptBuffer, setAttemptBuffer] = useState([]);
    const [attemptF0, setAttemptF0] = useState([]);

    async function getBuffer(url) {
        return await arrayBufferFromUrl({ url: url });
    }
    async function fetchF0(buffer) {
        return await getF0({ audioBuffer: buffer });
    }

    function getData() {
        let d = [];
        if (exampleF0 && Boolean(exampleF0.length)) {
            let exampleY = minMaxScale(exampleF0);
            let exampleX = minMaxScale(exampleF0.map((f, i) => i));
            for (let i = 0; i < exampleF0.length; i++) {
                if (exampleF0[i] > 350) {
                    d.push({ t: exampleX[i], example: exampleY[i] });
                }
            }
        }
        if (attemptF0 && Boolean(attemptF0.length)) {
            let attemptY = minMaxScale(attemptF0);
            let attemptX = minMaxScale(attemptF0.map((f, i) => i));
            for (let i = 0; i < attemptF0.length; i++) {
                if (attemptF0[i] > 350) {
                    d.push({ t: attemptX[i], attempt: attemptY[i] });
                }
            }
        }

        return d;
    }

    useEffect(() => {
        if (attempt && Boolean(attempt.length)) {
            setLoading(true);
            getBuffer(attempt)
                .then(setAttemptBuffer)
                .finally(() => setLoading(false));
        } else {
            setAttemptBuffer([]);
        }
    }, [attempt]);
    useEffect(() => {
        if (attemptBuffer.length) {
            setLoading(true);
            fetchF0(attemptBuffer)
                .then(setAttemptF0)
                .finally(() => setLoading(false));
        } else {
            setAttemptF0([]);
        }
    }, [attemptBuffer]);
    useEffect(() => {
        if (exampleBuffer.length) {
            setLoading(true);
            fetchF0(exampleBuffer)
                .then(setExampleF0)
                .finally(() => setLoading(false));
        }
    }, [exampleBuffer]);
    useEffect(() => {
        if (example && Boolean(example.length)) {
            setLoading(true);
            getBuffer(example)
                .then(setExampleBuffer)
                .finally(() => setLoading(false));
        }
    }, [example]);

    return (
        <div className={clsx(classes.root)}>
            {loading ? (
                <div className={clsx(classes.pad)}>
                    <CircularProgress />
                </div>
            ) : (
                <ResponsiveContainer>
                    <AreaChart
                        data={getData()}
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
                        <Area
                            type="monotone"
                            dataKey="attempt"
                            stroke={Theme.palette.error.main}
                            fill={Theme.palette.error.light}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

ToneGraph.displayName = "ToneGraph";
ToneGraph.propTypes = {
    example: PropTypes.string.isRequired,
    attempt: PropTypes.string
};
export default ToneGraph;
