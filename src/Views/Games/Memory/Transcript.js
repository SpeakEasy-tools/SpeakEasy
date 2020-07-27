import { getTranslations } from "../../../CloudFunctions/Translate";

async function Transcript(transcript, language) {
    const ret = {};
    await Promise.resolve(getTranslations(transcript, language))
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
