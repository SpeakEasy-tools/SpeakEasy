import PitchFinder from "pitchfinder";
import { MinMaxScaler } from "machinelearn/preprocessing";

export async function arrayBufferFromUrl(url) {
    return await fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => new AudioContext().decodeAudioData(buffer));
}

export async function playBuffer({ audioBuffer }) {
    const audioContext = new AudioContext();

    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.start();
    return sampleSource;
}

export async function getF0(audioBuffer) {
    const detectPitch = PitchFinder.YIN({ sampleRate: audioBuffer.sampleRate });
    const float32Array = new Float32Array([...audioBuffer.getChannelData(0)]);
    const bufferSize = 2048;

    let p = [];

    for (let i = 0; i < float32Array.length; i += bufferSize) {
        const fragment = float32Array.slice(
            i,
            Math.min(i + bufferSize, float32Array.length)
        );
        const pitch = detectPitch(fragment);
        p.push(pitch);
    }
    return p;
}

export function removeNulls(x) {
    const xs = [];
    const ys = [];

    x.forEach((v, i) => {
        if (v && typeof v === "number") {
            xs.push(v);
            ys.push(i);
        }
    });

    return [xs, ys];
}

export function minMaxScale(series) {
    const minMaxScaler = new MinMaxScaler({ featureRange: [0, 1] });
    return minMaxScaler.fit_transform(series);
}
