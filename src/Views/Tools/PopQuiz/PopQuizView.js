import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { LoadingBar } from "../../../Components/LoadingBar";
import { GetCocoCategories } from "../../../Queries";
import { translate } from "../../../CloudFunctions/Translate";
import { getUserLanguage } from "../../../UserProfile";
import PopQuizComponent from "./PopQuizComponent";
import Typography from "@material-ui/core/Typography";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: 10
    },
    row: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 10
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

function PopQuizView() {
    document.title = "Pop Quiz";
    const classes = useStyles(Theme);

    const language = getUserLanguage();

    const cocoCategories = GetCocoCategories();
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadingLabel = "Pop Quiz";

    useEffect(() => {
        if (
            cocoCategories &&
            Boolean(cocoCategories.length) &&
            language &&
            Boolean(Object.keys(language).length)
        ) {
            setIsLoading(true);
            Promise.all(
                cocoCategories
                    .filter(c => !c.name.includes("-"))
                    .map(c => translate(c.name, language.code))
            )
                .then(results => results.filter(r => typeof r !== "string"))
                .then(results =>
                    results.map(r => {
                        return {
                            id: uuid(),
                            transcript: (
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    align="center"
                                >
                                    {r.transcript.toLowerCase()}
                                </Typography>
                            ),
                            translation: (
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    align="center"
                                >
                                    {r.translation.toLowerCase()}
                                </Typography>
                            )
                        };
                    })
                )
                .then(setOptions)
                .finally(() => setIsLoading(false))
                .catch(console.error);
        }
    }, [cocoCategories, language]);

    const categories = useMemo(() => {
        if (options && Boolean(options.length)) {
            return options;
        }
    }, [options]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                {categories && Boolean(categories.length) && (
                    <PopQuizComponent topics={categories} />
                )}
            </div>
            {isLoading && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <LoadingBar label={loadingLabel} />
                    </div>
                </div>
            )}
        </div>
    );
}

PopQuizView.displayName = "PopQuizView";
export default PopQuizView;
