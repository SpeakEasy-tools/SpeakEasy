export {
    default as TextToSpeech,
    getVoices,
    synthesizeSpeech
} from "./TextToSpeech";
export { getAttempts as GetAttempts } from "./ToneTrainer";
export { uploadAttempt as UploadAttempt } from "./ToneTrainer";
export { listLanguages as ListLanguages } from "./Translate";
export { translate as Translate } from "./Translate";
export { fetchProfile, updateProfile } from "./Storage";
