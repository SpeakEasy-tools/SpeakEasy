import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { GetCocoImagesByCategory } from "../../../Queries";
import { LoadingBar } from "../../../Components/LoadingBar";

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: theme.palette.secondary.main,
        margin: theme.spacing(1)
    },
    column: {
        flex: 1,
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10
    },
    row: {
        width: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    pad: {
        margin: theme.spacing(1)
    },
    image: {
        flex: 1,
        maxHeight: 60,
        width: "100%",
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: 10,
        "&:hover": {
            cursor: "pointer"
        }
    },
    selected: {
        boxShadow: `0px 0px 10px ${theme.palette.primary.light}`
    }
}));

function GalleryPanel({ category, selectedImage }) {
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(true);
    const [loadingLabel, setLoadingLabel] = useState("Image Gallery");

    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [imageParams, setImageParams] = useState({
        category: category,
        limit: limit,
        offset: offset
    });

    const cocoImages = GetCocoImagesByCategory(imageParams);

    const [clickedImage, setClickedImage] = useState(null);

    const [images, setImages] = useState([]);
    const [count, setCount] = useState(0);
    const page = () => (count ? offset / limit + 1 : 0);
    const pageCount = () =>
        count ? Math.ceil(count / limit + 1 + Number.EPSILON) : 0;

    function handleClick(i) {
        setIsLoading(true);
        setImages([]);
        setLoadingLabel(`Image ${i.id} image`);
        selectedImage(i);
        setClickedImage(i);
    }
    function handlePreviousPage() {
        setImages([]);
        setIsLoading(true);
        setLoadingLabel("Previous page");
        setOffset(prevState => prevState - limit);
    }
    function handleNextPage() {
        setImages([]);
        setIsLoading(true);
        setLoadingLabel("Next page");
        setOffset(prevState => prevState + limit);
    }

    useEffect(() => {
        setIsLoading(false);
    }, []);
    useEffect(() => {
        if (category && limit && typeof offset === "number") {
            setIsLoading(true);
            setLoadingLabel(`${category} images`);

            setImageParams({
                category: category,
                limit: limit,
                offset: offset
            });
        }
    }, [category, limit, offset]);

    useEffect(() => {
        if (
            cocoImages &&
            Boolean(Object.keys(cocoImages).length) &&
            cocoImages.loading
        ) {
            setImages(null);
            setIsLoading(true);
            setLoadingLabel("");
        } else if (
            cocoImages &&
            Boolean(Object.keys(cocoImages).length) &&
            cocoImages.images &&
            !cocoImages.loading &&
            cocoImages.count
        ) {
            setImages(cocoImages.images);
            setIsLoading(false);

            setCount(cocoImages.count);
        }
    }, [cocoImages]);

    const imagesMemo = useMemo(() => {
        if (images && Boolean(images.length)) {
            return images;
        } else {
            return [];
        }
    }, [images]);
    return (
        <div className={clsx(classes.content)}>
            {isLoading && (
                <div className={clsx(classes.pad)} style={{ flex: 1 }}>
                    <LoadingBar label={loadingLabel} />
                </div>
            )}
            {imagesMemo && Boolean(imagesMemo.length) && (
                <>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                flexFlow: "row noWrap",
                                borderRadius: 10
                            }}
                        >
                            {images &&
                                Boolean(images.length) &&
                                imagesMemo.map(i => (
                                    <div
                                        key={i.id}
                                        className={clsx(classes.pad)}
                                    >
                                        <img
                                            className={clsx(classes.image, {
                                                [classes.selected]: clickedImage
                                                    ? clickedImage.id === i.id
                                                    : false
                                            })}
                                            src={i.metadata["coco_url"]}
                                            onClick={() => handleClick(i)}
                                            alt={`coco_image_${i.id}`}
                                        />
                                    </div>
                                ))}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexFlow: "row noWrap",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10
                            }}
                        >
                            <div className={clsx(classes.pad)}>
                                <IconButton
                                    style={{
                                        backgroundColor:
                                            Theme.palette.primary.main
                                    }}
                                    onClick={handlePreviousPage}
                                    disabled={page() <= 1}
                                >
                                    <KeyboardArrowLeft />
                                </IconButton>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="subtitle1"
                                    color="primary"
                                    align="center"
                                >
                                    Page {page()} of {pageCount()}
                                </Typography>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <IconButton
                                    style={{
                                        backgroundColor:
                                            Theme.palette.primary.main
                                    }}
                                    onClick={handleNextPage}
                                    disabled={page() >= pageCount()}
                                >
                                    <KeyboardArrowRight />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

GalleryPanel.displayName = "GalleryPanel";
GalleryPanel.propTypes = {
    category: PropTypes.string.isRequired,
    selectedImage: PropTypes.func.isRequired
};
export default GalleryPanel;
