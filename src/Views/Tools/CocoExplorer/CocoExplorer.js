import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GetCocoCategories } from "../../../Queries";
import TextField from "@material-ui/core/TextField";
import CocoViewer from "./CocoViewer";
import { LanguageSelect } from "../../../Components/LanguageSelect";

const useStyles = makeStyles(theme => ({
    root: {
        height: "92%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto"
    },
    column: {
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex"
    },
    pad: {
        padding: theme.spacing(1)
    },
    gallery: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexFlow: "row wrap",
        flex: "1 1 auto"
    },
    image: {
        flex: "1 1 auto"
    }
}));

function CocoExplorer() {
    document.title = "Coco Explorer";
    const classes = useStyles(Theme);

    const cocoCategories = GetCocoCategories();
    const [options, setOptions] = useState([]);

    const [category, setCategory] = useState();

    const [language, setLanguage] = useState();

    function handleCategoryChange(e, v) {
        setCategory(v.name);
    }
    useEffect(() => {
        if (cocoCategories) {
            setOptions(cocoCategories);
        }
    }, [cocoCategories]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h4" color="secondary">
                        Coco Explorer
                    </Typography>
                    <Divider />
                </div>
            </div>
            {Boolean(options.length) && (
                <div className={clsx(classes.row)}>
                    <LanguageSelect setLanguage={setLanguage} />
                    <div className={clsx(classes.pad)}>
                        <Autocomplete
                            options={options
                                .sort((a, b) => -b.name.localeCompare(a.name))
                                .sort(
                                    (a, b) =>
                                        -b.supercategory.localeCompare(
                                            a.supercategory
                                        )
                                )}
                            getOptionLabel={option => option.name}
                            groupBy={option => option.supercategory}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Object categories"
                                    variant="outlined"
                                />
                            )}
                            onChange={handleCategoryChange}
                            style={{ width: 200 }}
                            disabled={!language}
                        />
                    </div>
                </div>
            )}
            {category && language && (
                <CocoViewer category={category} language={language} />
            )}
        </div>
    );
}

CocoExplorer.displayName = "CocoExplorer";
export default CocoExplorer;
