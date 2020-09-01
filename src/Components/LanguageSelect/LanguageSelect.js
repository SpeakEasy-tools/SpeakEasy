import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import React, { useEffect, useState } from "react";
import { ListLanguages } from "../../CloudFunctions";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { UserProfile } from "../../UserProfile";
import { LoadingBar } from "../LoadingBar";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    content: {
        padding: theme.spacing(1),
        flex: "1 1 100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    pad: {
        padding: theme.spacing(1)
    },
    autocomplete: {
        color: theme.palette.primary.main,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.dark
        }
    },
    label: {
        color: theme.palette.primary.main
    }
}));

function LanguageSelect() {
    const classes = useStyles(Theme);

    const [loading, setLoading] = useState(true);
    const [languages, setLanguages] = useState([]);

    const [selectedLanguage, setSelectedLanguage] = useState();
    const { profile, updateSecondLanguage } = UserProfile();

    function handleChange(e, v) {
        updateSecondLanguage(v).then();
    }

    async function getLanguages() {
        setLoading(true);
        return await Promise.resolve(ListLanguages())
            .then(l => setLanguages(l))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getLanguages().finally();
    }, []);
    useEffect(() => {
        if (
            profile &&
            Boolean(Object.keys(profile).length) &&
            Boolean(Object.keys(profile).includes("secondLanguage")) &&
            Boolean(
                Object.keys(profile["secondLanguage"]).includes("code") &&
                    languages &&
                    languages.some(
                        l => l.code === profile["secondLanguage"].code
                    )
            )
        ) {
            setSelectedLanguage(
                languages.filter(
                    l => l.code === profile["secondLanguage"].code
                )[0]
            );
        }
    }, [profile, languages]);
    return (
        <>
            {loading ? (
                <div className={clsx(classes.pad)}>
                    <LoadingBar label="Languages" />
                </div>
            ) : (
                languages &&
                Boolean(languages.length) &&
                Boolean(selectedLanguage) && (
                    <div className={clsx(classes.pad)}>
                        <Autocomplete
                            value={selectedLanguage}
                            options={languages}
                            classes={{ inputRoot: clsx(classes.autocomplete) }}
                            getOptionLabel={option => option.name || ""}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    InputLabelProps={{
                                        className: clsx(classes.label)
                                    }}
                                    label="Language to learn"
                                    placeholder="e.g. Spanish"
                                    variant="outlined"
                                />
                            )}
                            style={{
                                width: 200
                            }}
                            onChange={handleChange}
                        />
                    </div>
                )
            )}
        </>
    );
}

LanguageSelect.displayName = "LanguageSelect";
export default LanguageSelect;
