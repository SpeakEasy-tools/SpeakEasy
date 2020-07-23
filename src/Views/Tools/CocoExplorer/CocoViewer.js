import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { GetCocoImagesByCategory } from "../../../Queries";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import ImagePanel from "./ImagePanel";
import { Theme } from "../../../utils";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import GalleryPanel from "./GalleryPanel";
import Divider from "@material-ui/core/Divider";

import { useUser } from "../../../UserProvider";

const useStyles = makeStyles(theme => ({
    root: {
        width: "98%",
        display: "flex",
        flexFlow: "column noWrap",
        margin: theme.spacing(1),
        background: theme.palette.secondary.light,
        border: `5px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px",
        textAlign: "center"
    },
    row: {
        flex: "1 1 auto",
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function CocoViewer({ category }) {
    const classes = useStyles(Theme);

    const user = useUser();

    const limit = 10;
    const [offset, setOffset] = useState(0);

    const [language, setLanguage] = useState({});

    const [selectedImage, setSelectedImage] = useState(null);

    const imageParams = {
        category: category,
        limit: limit,
        offset: offset
    };

    const { images, count, loading } = GetCocoImagesByCategory(imageParams);

    const [categoryName, setCategoryName] = useState("");

    function handlePreviousPage() {
        setOffset(prevState => prevState - limit);
    }

    function handleNextPage() {
        setOffset(prevState => prevState + limit);
    }

    useEffect(() => {
        if (category) {
            setCategoryName(category.toUpperCase());
        }
    }, [category]);

    useEffect(() => {
        if (
            user &&
            !user.loading &&
            Boolean(Object.keys(user.translationLanguage).length)
        ) {
            setLanguage(user.translationLanguage);
        }
    }, [user]);
    return (
        <div className={clsx(classes.root)}>
            <div
                className={clsx(classes.row)}
                style={{ justifyContent: "space-between" }}
            >
                <div className={clsx(classes.pad)}>
                    <Typography variant="h4" color="primary">
                        {categoryName}
                    </Typography>
                </div>
                {count && (
                    <div className={clsx(classes.pad)}>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <IconButton
                                    onClick={handlePreviousPage}
                                    disabled={offset < limit}
                                >
                                    <KeyboardArrowLeft color="primary" />
                                </IconButton>
                            </div>

                            <div className={clsx(classes.pad)}>
                                <Typography variant="h6" color="primary">
                                    Page {offset + 1} of{" "}
                                    {Math.ceil(count / limit)}
                                </Typography>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <IconButton onClick={handleNextPage}>
                                    <KeyboardArrowRight color="primary" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Divider />
            {loading && (
                <div
                    className={clsx(classes.row)}
                    style={{ justifyContent: "center" }}
                >
                    <div
                        className={clsx(classes.pad)}
                        style={{
                            border: `5px solid ${Theme.palette.primary.dark}`,
                            borderRadius: "10px"
                        }}
                    >
                        <CircularProgress color="primary" />
                    </div>
                </div>
            )}
            <div className={clsx(classes.row)}>
                {selectedImage &&
                language &&
                Boolean(Object.keys(language).length) ? (
                    <ImagePanel image={selectedImage} language={language} />
                ) : (
                    !loading && (
                        <div className={clsx(classes.pad)}>
                            <Typography variant="h4" color="primary">
                                Click an image below to begin
                            </Typography>
                        </div>
                    )
                )}
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    {images && (
                        <GalleryPanel
                            setSelectedImage={setSelectedImage}
                            images={images}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

CocoViewer.displayName = "CocoViewer";
CocoViewer.propTypes = {
    category: PropTypes.string.isRequired
};
export default CocoViewer;
