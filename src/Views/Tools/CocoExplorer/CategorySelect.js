import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GetCocoCategories } from "../../../Queries";
import TextField from "@material-ui/core/TextField";
import { LoadingBar } from "../../../Components/LoadingBar";

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 10
    },
    row: {
        width: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
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

function CategorySelect({ selectedCategory }) {
    const classes = useStyles(Theme);

    const cocoCategories = GetCocoCategories();
    const [isLoading, setIsLoading] = useState(true);
    const loadingLabel = "Coco Categories";
    const [options, setOptions] = useState([]);

    const [category, setCategory] = useState();

    function handleCategoryChange(e, v) {
        setCategory(v.name);
    }

    useEffect(() => {
        if (cocoCategories && Boolean(cocoCategories.length)) {
            setOptions(
                cocoCategories.sort((a, b) => -b.name.localeCompare(a.name))
            );
            setIsLoading(false);
        }
    }, [cocoCategories]);

    useEffect(() => {
        if (category) {
            selectedCategory(category);
        }
    }, [category, selectedCategory]);

    const categories = useMemo(() => {
        if (options && Boolean(options.length)) {
            return options.sort(
                (a, b) => -b.supercategory.localeCompare(a.supercategory)
            );
        }
    }, [options]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)} style={{ flex: "1 1 100%" }}>
                {isLoading ? (
                    <LoadingBar label={loadingLabel} />
                ) : (
                    <Autocomplete
                        options={categories}
                        classes={{
                            inputRoot: clsx(classes.autocomplete)
                        }}
                        groupBy={option => option.supercategory}
                        getOptionLabel={option => option.name || ""}
                        renderInput={params => (
                            <TextField
                                {...params}
                                InputLabelProps={{
                                    className: clsx(classes.label)
                                }}
                                label="Coco Category"
                                placeholder="e.g. Dog"
                                variant="outlined"
                                margin="none"
                            />
                        )}
                        style={{ width: 200 }}
                        onChange={handleCategoryChange}
                    />
                )}
            </div>
        </div>
    );
}

CategorySelect.displayName = "CategorySelect";
CategorySelect.propTypes = { selectedCategory: PropTypes.func };
export default CategorySelect;
