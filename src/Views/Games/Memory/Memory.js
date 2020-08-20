import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getRandomColor, Shuffle, Theme } from "../../../utils";
import clsx from "clsx";
import { UserProfile } from "../../../UserProfile";
import Typography from "@material-ui/core/Typography";
import { GetNRandomSeedCocoCategories } from "../../../Queries";
import Transcript from "./Transcript";
import { LoadingBar } from "../../../Components/LoadingBar";
import Button from "@material-ui/core/Button";
import Key from "./Key";
import Board from "./Board";

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        display: "flex",
        flexFlow: "column noWrap",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    row: {
        width: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "space-between",
        alignItems: "center",
        margin: theme.spacing(1),
        borderRadius: 10
    },
    title: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    disabled: {
        boxShadow: "0 0 20px red",
        pointerEvents: "none"
    }
}));

function Memory() {
    document.title = "Memory";
    const classes = useStyles(Theme);

    const [disabled, setDisabled] = useState(false);
    const [puzzleSeed, setPuzzleSeed] = useState(null);
    const [boardSize, setBoardSize] = useState(null);

    const { profile } = UserProfile();
    const [language, setLanguage] = useState(null);

    const { categories } = GetNRandomSeedCocoCategories(boardSize, puzzleSeed);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("");

    const [tiles, setTiles] = useState([]);

    function getKeysTiles(tiles_) {
        let ts = {};
        tiles_.forEach(t => {
            ts[t["color"]] = { ...t };
        });
        return Object.values(ts);
    }

    function checkMatch(a, b) {
        if (a["color"] === b["color"]) {
            setTiles(prevState =>
                prevState.map(t => {
                    return {
                        ...t,
                        isFlipped: false,
                        isMatched: t["isMatched"] || t["color"] === a["color"]
                    };
                })
            );
        } else {
            setTiles(prevState =>
                prevState.map(t => {
                    return { ...t, isFlipped: false };
                })
            );
        }
    }

    function handleFlip(id) {
        if (disabled) {
            return;
        }
        setDisabled(true);
        const flipped = tiles
            .filter(t => t["isFlipped"] || t["id"] === id)
            .map(t => {
                return { id: t["id"], color: t["color"] };
            });
        setTiles(prevState => {
            if (flipped.length <= 0 || flipped.length > 2) {
                return prevState.map(t => {
                    return { ...t, isFlipped: false };
                });
            } else if (flipped.length === 1) {
                return prevState.map(t => {
                    return { ...t, isFlipped: t["id"] === id };
                });
            } else {
                return prevState.map(t => {
                    return {
                        ...t,
                        isFlipped:
                            t["isFlipped"] ||
                            t["id"] === id ||
                            t["id"] === flipped[0]["id"] ||
                            t["id"] === flipped[1]["id"]
                    };
                });
            }
        });
        if (flipped.length === 2) {
            setTimeout(function() {
                checkMatch(...flipped);
                setDisabled(false);
            }, 1000);
        } else {
            setTimeout(function() {
                setDisabled(false);
            }, 1000);
        }
    }

    useEffect(() => {
        setPuzzleSeed(Math.random());
    }, []);
    useEffect(() => {
        if (puzzleSeed) {
            setBoardSize(Math.floor(Math.random() * 40));
        }
    }, [puzzleSeed]);

    useEffect(() => {
        if (profile && Boolean(Object.keys(profile).length)) {
            setLanguage(profile["secondLanguage"]);
        }
    }, [profile]);

    useEffect(() => {
        if (
            categories &&
            Boolean(categories.length) &&
            language &&
            Boolean(Object.keys(language).length)
        ) {
            setIsLoading(true);
            setLoadingLabel("Translations");
            Transcript(
                categories.map(c => c.name),
                language.code
            )
                .then(data => {
                    let newData = Object.keys(data).map(d => {
                        return {
                            transcript: d,
                            translation: data[d],
                            isFlipped: false,
                            isMatched: false,
                            color: getRandomColor()
                        };
                    });
                    newData = Shuffle(newData.concat(newData)).map(d => {
                        return { ...d, id: uuid() };
                    });
                    setTiles(newData);
                })
                .finally(() => {
                    setIsLoading(false);
                    setLoadingLabel("");
                });
        }
    }, [categories, language]);

    return (
        <div className={clsx(classes.content)}>
            {!isLoading ? (
                <>
                    <div className={clsx(classes.row, classes.title)}>
                        <div className={clsx(classes.pad)}>
                            <Button>Reset Board</Button>
                        </div>
                        <div className={clsx(classes.pad)}>
                            <Typography
                                variant="h4"
                                color="primary"
                                align="center"
                            >
                                Memory
                            </Typography>
                        </div>
                        <div className={clsx(classes.pad)}>
                            <Button>New Board</Button>
                        </div>
                    </div>
                    {language && Boolean(Object.keys(language).length) && (
                        <div
                            style={{
                                flex: "1 1 100%",
                                display: "flex",

                                margin: Theme.spacing(1),
                                padding: Theme.spacing(1),
                                overflow: "hidden",
                                backgroundColor: Theme.palette.secondary.dark,
                                borderRadius: 10
                            }}
                        >
                            <div
                                style={{
                                    flex: "1 1 100%",
                                    display: "flex",
                                    maxWidth: "30%",
                                    margin: Theme.spacing(1),
                                    padding: Theme.spacing(1),
                                    overflow: "hidden",
                                    backgroundColor:
                                        Theme.palette.secondary.main,
                                    borderRadius: 10
                                }}
                            >
                                <Key
                                    tiles={getKeysTiles(tiles)}
                                    language={language.name}
                                />
                            </div>
                            <div
                                style={{
                                    flex: "1 1 100%",
                                    display: "flex",
                                    margin: Theme.spacing(1),
                                    padding: Theme.spacing(1),
                                    overflow: "hidden",
                                    backgroundColor:
                                        Theme.palette.secondary.main,
                                    borderRadius: 10
                                }}
                                className={clsx({
                                    [classes.disabled]: disabled
                                })}
                            >
                                <Board tiles={tiles} handleFlip={handleFlip} />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={clsx(classes.row, classes.title)}>
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

Memory.displayName = "Memory";
export default Memory;
