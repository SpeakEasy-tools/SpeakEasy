import { useEffect, useState } from "react";

export default configs => {
    const [parsed, setParsed] = useState(null);

    useEffect(() => {
        if (!configs) return;
        let cs = configs.map(c => {
            if (!("config" in c)) return;
            let newConfig = JSON.parse(c["config"]);

            let panorama = {};
            if ("panorama" in newConfig) {
                panorama = {
                    svLat: parseFloat(newConfig["panorama"]["svLat"]),
                    svLng: parseFloat(newConfig["panorama"]["svLng"]),
                    initialHeading: parseFloat(
                        newConfig["panorama"]["initialHeading"]
                    ),
                    initialPitch: parseFloat(
                        newConfig["panorama"]["initialPitch"]
                    ),
                    intialHfov: parseFloat(
                        newConfig["panorama"]["initialHfov"]
                    ),
                    haov: parseFloat(newConfig["panorama"]["haov"]),
                    vaov: parseFloat(newConfig["panorama"]["vaov"]),
                    hfov: parseFloat(newConfig["panorama"]["hfov"]),
                    vOffset: parseFloat(newConfig["panorama"]["vOffset"]),
                    author: newConfig["panorama"]["author"]
                };
            }
            delete newConfig["panorama"];

            let gmap = {};
            if ("gmap" in newConfig) {
                gmap = {
                    center: {
                        lat: parseFloat(newConfig["gmap"]["center"]["lat"]),
                        lng: parseFloat(newConfig["gmap"]["center"]["lng"])
                    },
                    zoom: parseInt(newConfig["gmap"]["zoom"]),
                    markers:
                        newConfig["gmap"]["markers"] &&
                        newConfig["gmap"]["markers"].map(m => {
                            return {
                                lat: parseFloat(m.lat),
                                lng: parseFloat(m.lng)
                            };
                        }),
                    initialHeading: parseFloat(
                        newConfig["gmap"]["initialHeading"]
                    ),
                    initialPitch: parseFloat(newConfig["gmap"]["initialPitch"])
                };
            }
            delete newConfig["gmap"];

            let pois = [];
            if ("pois" in newConfig) {
                pois = newConfig["pois"].map(p => {
                    return {
                        ...p,
                        x: parseInt(p.x),
                        y: parseInt(p.y)
                    };
                });
            }
            delete newConfig["pois"];

            let narrative = [];
            if ("narrative" in newConfig) {
                narrative = newConfig["narrative"];
            }
            delete newConfig["narrative"];

            return {
                ...c,
                ...newConfig,
                panorama: panorama,
                gmap: gmap,
                pois: pois,
                narrative: narrative
            };
        });
        setParsed(cs);
    }, [configs]);

    return parsed;
};
