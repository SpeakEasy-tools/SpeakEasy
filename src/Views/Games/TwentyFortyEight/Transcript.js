import { getTranslations } from "../../../CloudFunctions/Translate";

export const transcript = {
    2: "two",
    4: "four",
    8: "eight",
    16: "sixteen",
    32: "thirty two",
    64: "sixty four",
    128: "one hundred twenty eight",
    256: "two hundred fifty six",
    512: "five hundred twelve",
    1024: "one thousand twenty four",
    2048: "two thousand forty eight"
};

export const colors = {
    2: {
        backgroundColor: "#4527a0",
        color: "#ffffff"
    },
    4: {
        backgroundColor: "#0d47a1",
        color: "#ffffff"
    },
    8: {
        backgroundColor: "#0091ea",
        color: "#000000"
    },
    16: {
        backgroundColor: "#64dd17",
        color: "#ffffff"
    },
    32: {
        backgroundColor: "#1b5e20",
        color: "#000000"
    },
    64: {
        backgroundColor: "#ffd600",
        color: "#000000"
    },
    128: {
        backgroundColor: "#ff6f00",
        color: "#000000"
    },
    256: {
        backgroundColor: "#dd2c00",
        color: "#000000"
    },
    512: {
        backgroundColor: "#4e342e",
        color: "#ffffff"
    },
    1024: {
        backgroundColor: "#424242",
        color: "#ffffff"
    },
    2048: {
        backgroundColor: "#37474f",
        color: "#ffffff"
    }
};

async function Transcript(language) {
    const vals = Object.values(transcript).map(v => String(v));
    const ret = {};
    await Promise.resolve(getTranslations(vals, language))
        .then(
            ts =>
                (ret["translations"] = ts.reduce(
                    (accumulator, currentValue) => {
                        accumulator[currentValue["transcript"]] =
                            currentValue["translation"];
                        return accumulator;
                    },
                    {}
                ))
        )
        .finally();
    return ret["translations"];
}

Transcript.displayName = "Transcript";
export default Transcript;
