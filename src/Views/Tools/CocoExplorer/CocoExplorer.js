import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { LoadingBar } from "../../../Components/LoadingBar";
import { getUserLanguage } from "../../../UserProfile";
import CategorySelect from "./CategorySelect";
import GalleryPanel from "./GalleryPanel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ImagePanel from "./ImagePanel";

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
        borderRadius: 10,
        backgroundColor: Theme.palette.secondary.dark
    },
    row: {
        display: "flex",
        width: "auto",
        height: "auto",
        flexFlow: "row noWrap",
        overflow: "hidden",
        justifyContent: "start",
        alignItems: "center",
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    icon: { color: theme.palette.primary.main },
    instructions: {
        margin: theme.spacing(1)
    }
}));

function CocoExplorer() {
    document.title = "Coco Explorer";
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(true);
    const loadingLabel = "Coco Explorer";

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const [activeStep, setActiveStep] = useState(0);
    const lang = getUserLanguage();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!lang) {
            setActiveStep(0);
        } else if (lang && !selectedCategory) {
            setActiveStep(1);
        } else if (lang && selectedCategory && !selectedImage) {
            setActiveStep(2);
        } else {
            setActiveStep(3);
        }
    }, [lang, selectedCategory, selectedImage]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <Stepper
                    activeStep={activeStep}
                    style={{
                        flex: 1,
                        borderRadius: 10,
                        backgroundColor: Theme.palette.secondary.main,
                        color: Theme.palette.primary.main
                    }}
                    alternativeLabel
                >
                    <Step>
                        <StepLabel>
                            <Typography color="primary">
                                Select a language to learn
                            </Typography>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Typography color="primary">
                                Select a category to practice
                            </Typography>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Typography color="primary">
                                Select an image to look at
                            </Typography>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Typography color="primary">
                                Find the objects in the image
                            </Typography>
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>

            {lang && (
                <>
                    <div className={clsx(classes.row)}>
                        <div>
                            <CategorySelect
                                selectedCategory={setSelectedCategory}
                            />
                        </div>
                        {selectedCategory && (
                            <div style={{ flex: 1 }}>
                                <GalleryPanel
                                    selectedImage={setSelectedImage}
                                    category={selectedCategory}
                                />
                            </div>
                        )}
                    </div>
                    {selectedImage && (
                        <div className={clsx(classes.row)}>
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <ImagePanel
                                    image={selectedImage}
                                    language={lang}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
            {isLoading && (
                <div className={clsx(classes.row)}>
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

CocoExplorer.displayName = "CocoExplorer";
export default CocoExplorer;
