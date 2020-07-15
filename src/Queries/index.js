export { GetCocoCategories } from "./CocoCategories";
export { GetCocoAnnotationsByImageId } from "./CocoAnnotations";
export { GetCocoImagesByCategory } from "./CocoImages";
export { GetCorpus, GetRandomCorpus, GetCorpusById } from "./Corpus";
export {
    DeleteCourse,
    GetCourses,
    InsertCourse,
    UpdateCourse
} from "./Courses";
export { GetLanguages, GetUsedLanguages } from "./Languages";
export {
    DeleteLesson,
    GetLessons,
    GetLessonsByUser,
    InsertLesson,
    UpdateLesson
} from "./Lessons";
export { GetRandomLessons } from "./RandomLessons";
export {
    GetConfigs,
    GetConfigsByName,
    InsertConfig,
    DeleteConfig,
    UpdateConfig
} from "./ModuleConfigs";
export { GetModules } from "./Modules";
export { GetScores, InsertScore } from "./Scores";
export {
    GetStudents,
    GetStudentsCourses,
    GetStudentProfile,
    InsertStudent
} from "./Students";
export {
    GetTranslations,
    GetNativeTranslations,
    GetTargetTranslations
} from "./Translations";
export { GetUsers } from "./Users";
export { GetVocabulary } from "./Vocabulary";
export {
    GetVocabularyLists,
    InsertVocabularyLists,
    DeleteVocabularyList,
    UpdateVocabularyList
} from "./VocabularyLists";
export {
    GetVocabularyListsWords,
    InsertVocabularyListsWords,
    DeleteVocabularyListsWords
} from "./VocabularyListsWords";
