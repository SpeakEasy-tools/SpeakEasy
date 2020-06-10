import PropType from "prop-types";
import React, { useRef } from "react";
import { Pannellum } from "pannellum-react";

function PanoramaViewer({ panorama, panoramaPath, setSvPov }) {
    const {
        author,
        haov,
        vaov,
        vOffset,
        hfov,
        initialHeading,
        initialPitch
    } = panorama;

    const pannellumRef = useRef();

    const handleRender = () => {
        if (pannellumRef && pannellumRef.current && setSvPov) {
            const {
                yaw,
                pitch,
                hfov
            } = pannellumRef.current.panorama.getConfig();
            var zoom = Math.log(180 / hfov) / Math.log(2);
            var pov = { heading: yaw, pitch: pitch, zoom: zoom };
            setSvPov(pov);
        }
    };

    return (
        <Pannellum
            ref={pannellumRef}
            width="100%"
            height="100%"
            image={panoramaPath}
            haov={haov || 360}
            vaov={vaov || 180}
            vOffset={vOffset || 0}
            pitch={initialPitch || 0}
            yaw={initialHeading || 0}
            hfov={hfov || 100}
            autoLoad
            author={author}
            orientationOnByDefault={false}
            draggable
            keyboardZoom
            mouseZoom
            showControls={false}
            showFullscreenCtrl={false}
            showZoomCtrl={false}
            onRender={handleRender}
        />
    );
}
PanoramaViewer.displayName = "PanoramaViewer";
PanoramaViewer.propTypes = {
    panorama: PropType.any,
    panoramaPath: PropType.any,
    setSvPov: PropType.any
};
export default PanoramaViewer;
