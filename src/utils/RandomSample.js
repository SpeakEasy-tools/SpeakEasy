import { Shuffle } from "./index";

const randomSample = (array, sampleSize) => {
    return Shuffle(array).slice(0, sampleSize);
};

export default randomSample;
