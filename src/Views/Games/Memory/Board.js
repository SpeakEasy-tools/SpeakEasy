import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { GetNRandomSeedCocoCategories } from "../../../Queries";
import Transcript from "./Transcript";
import { UserProfile } from "../../../UserProfile";
import { LoadingBar } from "../../../Components/LoadingBar";
import Key from "./Key";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        flex: "1 1 auto",
        padding: theme.spacing(1)
    },
    row: {
        width: "100%",
        display: "flex",
        flex: "1 1 auto"
    },
    pad: {
        width: "20%",
        padding: theme.spacing(1),
        flex: "1 1 auto"
    }
}));

function Board() {
    const classes = useStyles(Theme);

    const tileCount = 40;
    const [puzzleSeed, setPuzzleSeed] = useState(null);

    const { categories, loading } = GetNRandomSeedCocoCategories({
        n: tileCount,
        seed: puzzleSeed
    });

    const [translations, setTranslations] = useState([]);
    const [translationsLoading, setTranslationsLoading] = useState(false);

    const [tiles, setTiles] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("");

    const [language, setLanguage] = useState();
    const { profile } = UserProfile();

    useEffect(() => {
        if (profile && profile["secondLanguage"]) {
            setLanguage(profile["secondLanguage"].code);
            setPuzzleSeed(Math.random());
        }
    }, [profile]);
    useEffect(() => {
        function randomEvenInRange() {
            const minPairs = 8;
            const maxPairs = 20;
            const n =
                Math.floor(Math.random() * (maxPairs - minPairs + 1)) +
                minPairs;
            return n % 2 !== 0 ? randomEvenInRange() : n;
        }

        if (categories) {
            setTranslationsLoading(true);
            const pairCount = randomEvenInRange();
            const transcript = categories.slice(0, pairCount).map(c => c.name);
            Promise.resolve(Transcript(transcript, language)).then(ts =>
                setTranslations(ts)
            );
        }
    }, [categories, language]);
    useEffect(() => {
        if (translations && Boolean(Object.keys(translations).length)) {
            setTranslationsLoading(false);
            setTiles(
                Object.keys(translations).map(t => {
                    return {
                        transcript: t,
                        translation: translations[t]
                    };
                })
            );
        }
    }, [translations]);

    useEffect(() => {
        if (loading || translationsLoading) {
            setIsLoading(true);
            if (loading) {
                setLoadingLabel(prevState => prevState + "Labels ");
            }
            if (translationsLoading) {
                setLoadingLabel(prevState => prevState + "Translations ");
            }
        } else {
            setLoadingLabel("");
            setIsLoading(false);
        }
    }, [loading, translationsLoading]);

    return (
        <div className={clsx(classes.root)}>
            {isLoading ? (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <LoadingBar label={loadingLabel} />
                    </div>
                </div>
            ) : (
                tiles && (
                    <>
                        <div className={clsx(classes.column)}></div>
                        <div>
                            <Key pairs={tiles} />
                        </div>
                    </>
                )
            )}
        </div>
    );
}

Board.displayName = "Board";

export default Board;
