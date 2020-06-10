import PropType from "prop-types";
import React, { useEffect, useState } from "react";
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
    initialHeading,
    initialPitch,
    streetViewContainer,
    setSvPovOut
}) {
    const classes = useStyles(Theme);

    const [streetView, setStreetView] = useState(null);

    useEffect(() => {
        return function cleanupListeners() {
            window.removeEventListener("pov_changed", updatePovOut);
        };
    });

    useEffect(() => {
        if (streetView) {
            streetView.setPosition({ lat: svLat, lng: svLng });
            streetView.setPov({ heading: initialHeading, pitch: initialPitch });
        }
    }, [svLat, svLng, initialHeading, initialPitch, streetView]);

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
            const panorama = new maps.StreetViewPanorama(streetViewContainer, {
                position: { lat: parseFloat(svLat), lng: parseFloat(svLng) },

                pov: {
                    heading: initialHeading,
                    pitch: initialPitch
                },
                linksControl: false,
                zoomControl: false,
                panControl: false,
                fullscreenControl: false,
                clickToGo: false,
                disableDefaultUI: true
            });
            setStreetView(panorama);
            /* initialize PoI placements by setting currentPov */
            updatePovOut(panorama);

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
    zoom: PropType.any,
    mapLat: PropType.any,
    mapLng: PropType.any,
    svLat: PropType.any,
    svLng: PropType.any,
    initialHeading: PropType.any,
    initialPitch: PropType.any,
    streetViewContainer: PropType.any,
    setSvPovOut: PropType.any
};
export default GoogleMap;
