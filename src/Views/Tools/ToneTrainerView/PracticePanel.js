import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../../UserProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { getUserLanguage } from "../../../UserProfile";
import { UploadAttempt } from "../../../CloudFunctions";
import { LoadingBar } from "../../../Components/LoadingBar";
import Typography from "@material-ui/core/Typography";
import { Recorder } from "../../../Components/Recorder";
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceArea,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { arrayBufferFromUrl } from "../../../FeatureExtraction";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Label from "recharts/lib/component/Label";
import interpolate from "color-interpolate";

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
        backgroundColor: theme.palette.secondary.light
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
    icon: {
        color: theme.palette.secondary.main
    },
    button: {
        backgroundColor: theme.palette.primary.main
    }
}));

function PracticePanel({ sample, attempt }) {
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(false);
    const loadingLabel = "Practice attempts";

    const user = useUser();
    const language = getUserLanguage();

    const [uid, setUid] = useState(null);

    const [transcript, setTranscript] = useState(null);

    const [attempts, setAttempts] = useState({});
    const [selectedAttempt, setSelectedAttempt] = useState(null);

    const [date, setDate] = useState(new Date());

    function handleChangeAttempt(a) {
        console.log(isLoading);
        setSelectedAttempt(a);
    }

    function handleNewRecording(url) {
        if (uid) {
            Promise.resolve(
                UploadAttempt(
                    uid,
                    language.code,
                    transcript,
                    arrayBufferFromUrl(url)
                )
            ).then();
        }
    }

    function formatDate(d) {
        const dateTimeFormat = new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            dayPeriod: "short"
        });
        const [
            { value: month },
            ,
            { value: day },
            ,
            { value: year },
            ,
            { value: hour },
            ,
            { value: minute },
            ,
            { value: second },
            ,
            { value: dayPeriod }
        ] = dateTimeFormat.formatToParts(d);
        return {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            dayPeriod: dayPeriod
        };
    }

    function getColor(v) {
        return interpolate(["red", "yellow", "green"])(v);
    }

    function getDayColor(d) {
        return getColor(
            Object.keys(d)
                .map(k => d[k]["s"])
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                ) / Object.keys(d).length
        );
    }

    function CustomTooltip({ label }) {
        if (label === "not ever going to happen") {
            handleChangeAttempt(null);
            setIsLoading(false);
        }
        return <div>{`${Math.round(label * 100 + Number.EPSILON)}%`}</div>;
    }
    CustomTooltip.propTypes = {
        active: PropTypes.bool,
        label: PropTypes.any,
        payload: PropTypes.any,
        type: PropTypes.string
    };

    function renderDay(d, selectedDate, dayInCurrentMonth, dayComponent) {
        let { year, month, day } = formatDate(d);
        let now = `${year}/${month}/${day}`;

        if (now in attempts) {
            return (
                <div
                    style={{
                        position: "relative"
                    }}
                >
                    {dayComponent}
                    <div
                        style={{
                            position: "absolute",
                            height: 0,
                            width: 0,
                            border: `2px solid ${getDayColor(attempts[now])}`,
                            borderRadius: 4,
                            right: "50%",
                            transform: "translateX(1px)",
                            top: "80%"
                        }}
                    />
                </div>
            );
        }
        return <>{dayComponent}</>;
    }

    function getCurrentAttempts() {
        let { year, month, day } = formatDate(date);
        let now = `${year}/${month}/${day}`;

        let data = [];
        if (now in attempts) {
            data = Object.keys(attempts[now]).map(k => {
                let { hour, minute, second, dayPeriod } = formatDate(
                    attempts[now][k]["date"]
                );
                let time = 0;
                if (dayPeriod.toLowerCase() === "pm") {
                    time +=
                        Math.round(
                            (100 * (parseInt(hour) + 12)) / 24 + Number.EPSILON
                        ) / 100;
                } else {
                    time +=
                        Math.round(
                            (100 * parseInt(hour)) / 24 + Number.EPSILON
                        ) / 100;
                }

                time +=
                    Math.round((100 * parseInt(minute)) / 60 + Number.EPSILON) /
                        10000 +
                    Math.round((100 * parseInt(second)) / 60 + Number.EPSILON) /
                        1000000;
                time = Math.round(10000000 * time + Number.EPSILON) / 10000000;

                return {
                    t: time,
                    s: attempts[now][k]["s"],
                    label: `${hour}:${minute}:${second}${dayPeriod}`
                };
            });
            console.log(data);
        }
        return (
            <ResponsiveContainer
                width={300}
                height="80%"
                style={{
                    backgroundColor: Theme.palette.primary.main,
                    borderRadius: 10
                }}
            >
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                    <XAxis
                        dataKey="t"
                        domain={[0, 1]}
                        type="number"
                        allowDataOverflow
                        axisLine={false}
                        tickLine={false}
                        tick={({ x, y, payload }) => {
                            return (
                                <g transform={`translate(${x}, ${y})`}>
                                    <text
                                        x={0}
                                        y={0}
                                        dy={16}
                                        textAnchor="end"
                                        fill={Theme.palette.secondary.main}
                                        stroke={Theme.palette.secondary.main}
                                        transform="rotate(-35)"
                                    >
                                        {decimalToTime(payload.value)}
                                    </text>
                                </g>
                            );
                        }}
                    >
                        <Label
                            offset={-25}
                            position="insideBottom"
                            stroke={Theme.palette.secondary.main}
                        >
                            Time
                        </Label>
                    </XAxis>
                    <YAxis
                        domain={[0, 1]}
                        allowDataOverflow
                        axisLine={false}
                        tickLine={false}
                        tick={({ x, y, payload }) => {
                            return (
                                <g transform={`translate(${x}, ${y})`}>
                                    <text
                                        x={0}
                                        y={0}
                                        dx={-10}
                                        textAnchor="end"
                                        fill={Theme.palette.secondary.main}
                                        stroke={Theme.palette.secondary.main}
                                        transform="rotate(-35)"
                                    >
                                        {payload.value === 0.5
                                            ? "50%"
                                            : payload.value === 1
                                            ? "100%"
                                            : ""}
                                    </text>
                                </g>
                            );
                        }}
                    >
                        <Label
                            angle={-90}
                            stroke={Theme.palette.secondary.main}
                            position="left"
                        >
                            Score
                        </Label>
                    </YAxis>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={Theme.palette.secondary.main}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        dataKey="s"
                        stroke={getColor(
                            data && data.length ? data[data.length - 1]["s"] : 0
                        )}
                        label={({ x, y, value }) => {
                            return (
                                <text
                                    x={x}
                                    y={y}
                                    dy={-4}
                                    stroke={"red"}
                                    strokeOpacity={1}
                                    fill={"black"}
                                    fillOpacity={0.8}
                                    fontSize={10}
                                    textAnchor="middle"
                                    transform="rotate(-35)"
                                >
                                    {decimalToTime(value)}
                                </text>
                            );
                        }}
                    />
                    <ReferenceArea
                        x1={data && data.length ? data[0]["t"] : 0}
                        x2={
                            data && data.length ? data[data.length - 1]["t"] : 0
                        }
                        y1={data && data.length ? data[0]["s"] : 0}
                        y2={
                            data && data.length ? data[data.length - 1]["s"] : 0
                        }
                        stroke={getColor(
                            data && Boolean(data.length)
                                ? data[data.length - 1]["s"]
                                : 0
                        )}
                        strokeOpacity={1}
                        fill={getColor(
                            data && Boolean(data.length)
                                ? data[data.length - 1]["s"]
                                : 0
                        )}
                        fillOpacity={0.8}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    function decimalToTime(d) {
        let hour = Math.round(24 * d * 100 + Number.EPSILON) / 100;
        let minute = Math.round(60 * ((hour * 100) % 100)) / 100;
        let second = Math.round(60 * ((minute * 100) % 100)) / 100;
        let dayPeriod = hour >= 12 && hour < 24 ? "pm" : "am";

        if (hour > 12) {
            hour -= 12;
        }

        let time = `${hour < 10 ? "0" + String(hour) : hour}:${
            minute < 10 ? "0" + String(minute) : minute
        }:${second < 10 ? "0" + String(second) : second}${dayPeriod}`;
        if (minute === 0 && second === 0) {
            return `${hour === 0 ? 12 : hour}${dayPeriod}`;
        }
        return time;
    }

    useEffect(() => {
        if (user && Boolean(Object.keys(user).length) && "userId" in user) {
            setUid(user.userId);
        }
    }, [user]);

    useEffect(() => {
        if (
            sample &&
            Boolean(Object.keys(sample).length) &&
            "transcript" in sample
        ) {
            setTranscript(sample.transcript);
        }
    }, [sample]);

    useEffect(() => {
        if (
            language &&
            Boolean(Object.keys(language).length) &&
            uid &&
            transcript
        ) {
            /*setIsLoading(true);
      Promise.resolve(
          GetAttempts(language, transcript, uid).then(atts => {
              const newAtts = {};
              atts.forEach(a => {
                  let d = new Date(
                      parseInt(
                          a
                              .split("?")[0]
                              .split("%2F")
                              .pop()
                              .split(".")[0]
                      )
                  );
                  let {
                      year,
                      month,
                      day,
                      hour,
                      minute,
                      second,
                      dayPeriod
                  } = formatDate(d);
                  let now = `${year}/${month}/${day}`;
                  if (!(now in newAtts)) {
                      newAtts[now] = {};
                  }

                  let time = `${hour}:${minute}:${second}${dayPeriod}`;
                  newAtts[now][time] = { url: a, date: d, s: 0 };
              });
              setAttempts(newAtts);
          })
      ).then(() => setIsLoading(false));*/
            let d = new Date();

            let s = 0;

            const newAtts = {};
            for (let i = 10; i > 0; i--) {
                let newD = new Date();
                newD.setDate(d.getDate() - i);
                let { year, month, day } = formatDate(newD);
                let now = `${year}/${month}/${day}`;
                if (!(now in newAtts)) {
                    newAtts[now] = {};
                }
                for (let j = 6; j > 0; j--) {
                    let newT = new Date(newD.getTime() - j * 60000 * 60);
                    let { hour, minute, second, dayPeriod } = formatDate(newT);
                    s = Math.round(100 * (s + 0.01) + Number.EPSILON) / 100;
                    let time = `${hour}:${minute}:${second}${dayPeriod}`;
                    newAtts[now][time] = { date: newT, s: s };
                }
            }
            setAttempts({ ...newAtts });
        }
    }, [language, sample, uid, transcript]);

    useEffect(() => {
        if (selectedAttempt) {
            attempt(selectedAttempt);
        }
    }, [selectedAttempt, attempt]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        align="center"
                    >
                        Practice
                    </Typography>
                </div>
                <div className={clsx(classes.pad)}>
                    <Recorder url={handleNewRecording} />
                </div>
            </div>
            <div
                className={clsx(classes.column)}
                style={{
                    margin: Theme.spacing(1),
                    padding: Theme.spacing(1)
                }}
            >
                <div style={{ flex: 1 }}>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    autoOk
                                    disableFuture
                                    disableToolbar
                                    variant="static"
                                    orientation="landscape"
                                    openTo="date"
                                    value={date}
                                    onChange={setDate}
                                    renderDay={renderDay}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={clsx(classes.row)}>
                            <div
                                className={clsx(classes.pad)}
                                style={{ flex: "1 1 100%" }}
                            >
                                <LoadingBar label={loadingLabel} />
                            </div>
                        </div>
                    ) : (
                        <div className={clsx(classes.row)}>
                            <div
                                className={clsx(classes.pad)}
                                style={{
                                    flex: 1,
                                    width: 400,
                                    height: 200,
                                    backgroundColor: Theme.palette.primary.main,
                                    borderRadius: 10
                                }}
                            >
                                {getCurrentAttempts()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

PracticePanel.displayName = "PracticePanel";
PracticePanel.propTypes = {
    sample: PropTypes.object.isRequired,
    attempt: PropTypes.func.isRequired
};
export default PracticePanel;
