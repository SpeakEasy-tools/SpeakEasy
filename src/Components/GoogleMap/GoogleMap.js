import PropType from "prop-types";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import clsx from "clsx";
import config from "../../config";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
// import "./panomarker_js";

const useStyles = makeStyles(() => ({
    root: {
        //These need to be set with px values explicitly or Google Maps will not render correctly
        width: "300px",
        height: "300px"
    }
}));

function GoogleMap({
    markers,
    zoom,
    mapLat,
    mapLng,
    svLat,
    svLng,
    heading,
    pitch,
    panoContainer,
    setSvPovOut
}) {
    const classes = useStyles(Theme);

    useEffect(() => {
        return function cleanupListeners() {
            window.removeEventListener("pov_changed", updatePovOut);
        };
    });

    const formatMarkers = () => {
        let ms = [];
        if (markers)
            ms = markers.map((m, index) => {
                return (
                    <MapMarker
                        key={index}
                        lat={parseFloat(m.lat)}
                        lng={parseFloat(m.lng)}
                    />
                );
            });
        return ms;
    };

    const getOptions = () => {
        return {
            // disableDefaultUI: false,
            fullscreenControl: false,
            streetViewControl: false
        };
    };

    const updatePovOut = panorama => {
        var pov = panorama.getPov();
        setSvPovOut(pov);
    };

    const apiIsLoaded = (map, maps) => {
        if (map) {
            const panorama = new maps.StreetViewPanorama(panoContainer, {
                // position: { lat: 42.726884, lng: -73.692533 },
                // position: { lat: 31.208505, lng: 121.468125 },
                position: { lat: parseFloat(svLat), lng: parseFloat(svLng) },

                pov: {
                    heading: heading,
                    pitch: pitch
                },
                // motionTrackingControl: true,
                linksControl: false,
                zoomControl: false,
                panControl: false,
                fullscreenControl: false,
                clickToGo: false,
                disableDefaultUI: true
            });
            updatePovOut(panorama); // initialize marker placements by setting currentPov

            panorama.addListener("pov_changed", function() {
                updatePovOut(panorama);
            });
        }
    };

    return (
        <div className={clsx(classes.root)}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.GOOGLE_MAPS_API_KEY }}
                defaultCenter={{
                    lat: parseFloat(mapLat),
                    lng: parseFloat(mapLng)
                }}
                defaultZoom={parseInt(zoom)}
                options={getOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            >
                {formatMarkers()}
            </GoogleMapReact>
        </div>
    );
}

GoogleMap.displayName = "GoogleMap";
GoogleMap.propTypes = {
    markers: PropType.any,
    zoom: PropType,
    mapLat: PropType.any,
    mapLng: PropType.any,
    svLat: PropType.any,
    svLng: PropType.any,
    heading: PropType.any,
    pitch: PropType.any,
    panoContainer: PropType.any,
    setSvPovOut: PropType.any
};
export default GoogleMap;
