import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import {
    Card,
    ControlBar,
    GoogleMap,
    PanoramaViewer
} from "../../../Components";
import SpyCard from "./SpyCard";
import NarrativeCard from "./NarrativeCard";
import Settings from "./Settings";
import Instructions from "./Instructions";
import { v4 as uuid } from "uuid";

import povToPixel from "../../../utils/povToPixel";
import { UserProfile } from "../../../UserProfile";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto"
    },
    column: {
        display: "flex",
        flexFlow: "column noWrap",
        alignItems: "center"
    },
    row: {
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center"
    },
    rowLeft: {
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center"
    },
    rowCenter: {
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center",
        justifyContent: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        minWidth: 200,
        backgroundColor: theme.palette.primary.light
    },
    content: {
        flex: "1 1 100%"
    },
    map: {
        flex: "1 1 100%",
        position: "relative",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing(1)
    },
    svContainer: {
        width: "100%",
        height: "calc(100% - 52px)"
    },
    spyCard: {
        maxWidth: 300,
        zIndex: 101,
        position: "absolute"
    }
}));

function EyeSpy() {
    document.title = "Eye-Spy";
    const classes = useStyles(Theme);

    /* Reference to the div to place Dynamic Street View */
    const [streetViewContainer, setStreetViewContainer] = useState(null);

    const { profile } = UserProfile();

    const [language, setLanguage] = useState(null);

    /* Variables from Settings Gear */
    const [mode, setMode] = useState(null);
    const [config, setConfig] = useState(null);
    const [parsedConfigs, setParsedConfigs] = useState(null);

    /* Variables from inside config */
    const [panorama, setPanorama] = useState({});
    const [panoramaPath, setPanoramaPath] = useState(null);
    const [gmap, setGmap] = useState(null);
    const [pois, setPois] = useState(null);

    const [narrative, setNarrative] = useState([]);

    /* Variable to keep track of current Point-of-View in Street View */
    const [svPov, setSvPov] = useState(null);

    const instructions = Instructions();
    const getSettings = () => (
        <Settings
            mode={mode}
            setMode={setMode}
            config={config}
            setConfig={setConfig}
            parsedConfigs={parsedConfigs}
            setParsedConfigs={setParsedConfigs}
        />
    );

    function getInstructions() {
        console.log(language);
        return instructions;
    }

    /* Set state variables from config values */
    useEffect(() => {
        if (!config) return;
        setPanorama(config.panorama);
        setPanoramaPath(config["files"][0]);
        setGmap(config.gmap);
        setPois(config.poi);
        setNarrative(config.narrative);
    }, [config]);

    useEffect(() => {
        if (profile && profile["secondLanguage"]) {
            setLanguage(profile["secondLanguage"]);
        }
    }, [profile]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.content)}>
                <div style={{ position: "absolute", zIndex: 10 }}>
                    <ControlBar
                        settings={getSettings}
                        updateLanguage={setLanguage}
                        instructions={getInstructions}
                    />
                </div>
                {/* Custom Panorama Container */}
                {panoramaPath && (
                    <PanoramaViewer
                        panorama={panorama}
                        panoramaPath={panoramaPath}
                        setSvPov={setSvPov}
                    />
                )}

                {/* Street View Container */}
                <div
                    ref={elem => setStreetViewContainer(elem)}
                    className={clsx(classes.svContainer)}
                />

                {/* Add Points of Interest */}
                {pois &&
                    pois.map(v => (
                        <div
                            key={uuid()}
                            className={clsx(classes.spyCard)}
                            style={povToPixel(
                                { heading: v.x, pitch: v.y },
                                svPov || { heading: 0, pitch: 0 },
                                streetViewContainer
                            )}
                        >
                            <SpyCard
                                poi={v}
                                setConfig={setConfig}
                                parsedConfigs={parsedConfigs}
                            />
                        </div>
                    ))}

                {/* NARRATION CARD */}
                {Boolean(narrative.length) && (
                    <NarrativeCard
                        narrative={narrative}
                        setNarrative={setNarrative}
                    />
                )}

                {/* Add Google Map */}
                {gmap && (
                    <div
                        className={clsx(classes.pad)}
                        style={{
                            maxWidth: 350,
                            display: "flex",
                            justifyItems: "center"
                        }}
                    >
                        <Card
                            title={() => ""}
                            body={() => (
                                <div className={clsx(classes.map)}>
                                    <GoogleMap
                                        streetViewContainer={
                                            streetViewContainer
                                        }
                                        markers={gmap.markers}
                                        zoom={gmap.zoom}
                                        mapLat={gmap.center.lat}
                                        mapLng={gmap.center.lng}
                                        svLat={panorama.svLat}
                                        svLng={panorama.svLng}
                                        initialHeading={
                                            panorama.initialHeading || 0
                                        }
                                        initialPitch={
                                            panorama.initialPitch || 0
                                        }
                                        setSvPovOut={setSvPov}
                                    />
                                </div>
                            )}
                            darkMode
                            stayOpen
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

EyeSpy.displayName = "EyeSpy";
export default EyeSpy;
