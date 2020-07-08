import React from "react";
import { Route } from "react-router";
import {
    TwentyFortyEight,
    About,
    Contact,
    Dictionary,
    EyeSpy,
    FAQ,
    Flashcards,
    Help,
    Home,
    Instructor,
    Memory,
    Modules,
    Page404,
    PopQuiz,
    Profile,
    Sudoku,
    TileSlider,
    TimeSeries,
    ToneTrainerView,
    WordSearch
} from "../Views";

/*
 * This file populates your router. Import a view, add it to the routes, and it will be available in the router.
 */

export const LANDING = {
    path: "/",
    name: "Home",
    component: Home,
    exact: true
};
export const HOME = { path: "/home", name: "HOME", component: Home };
export const INSTRUCTOR = {
    path: "/instructor",
    name: "Instructor",
    component: Instructor
};

export const TWENTY_FORTY_EIGHT = {
    path: "/2048",
    name: "2048",
    component: TwentyFortyEight
};
export const EYE_SPY = { path: "/eye_spy", name: "Eye Spy", component: EyeSpy };
export const MEMORY = { path: "/memory", name: "Memory", component: Memory };
export const SUDOKU = { path: "/sudoku", name: "Sudoku", component: Sudoku };
export const TILE_SLIDER = {
    path: "/tile_slider",
    name: "Tile Slider",
    component: TileSlider
};

export const ABOUT = { path: "/about", name: "About", component: About };
export const CONTACT = {
    path: "/contact",
    name: "Contact",
    component: Contact
};
export const FAQS = { path: "/faq", name: "FAQ", component: FAQ };
export const HELP = { path: "/help", name: "Help", component: Help };
export const PROFILE = {
    path: "/profile",
    name: "Profile",
    component: Profile
};
export const DICTIONARY = {
    path: "/dictionary",
    name: "Dictionary",
    component: Dictionary
};
export const FLASHCARDS = {
    path: "/flashcards",
    name: "Flashcards",
    component: Flashcards
};
export const POP_QUIZ = {
    path: "/pop_quiz",
    name: "Pop Quiz",
    component: PopQuiz
};
export const TIME_SERIES = {
    path: "/time_series",
    name: "Time Series Analyzer",
    component: TimeSeries
};
export const TONE_TRAINER = {
    path: "/tone_trainer",
    name: "Tone Trainer",
    component: ToneTrainerView
};
export const WORD_SEARCH = {
    path: "/word_search",
    name: "Word Search",
    component: WordSearch
};

export const MODULES = {
    path: "/modules",
    name: "Module management",
    component: Modules
};

export const PAGE404 = {
    path: "*",
    name: "404",
    component: Page404
};

const routes = [
    LANDING,
    HOME,
    TWENTY_FORTY_EIGHT,
    EYE_SPY,
    MEMORY,
    SUDOKU,
    TILE_SLIDER,
    ABOUT,
    CONTACT,
    FAQS,
    HELP,
    HOME,
    PROFILE,
    DICTIONARY,
    FLASHCARDS,
    POP_QUIZ,
    TIME_SERIES,
    TONE_TRAINER,
    WORD_SEARCH,
    PAGE404
];

const devRoutes = [MODULES];
const adminRoutes = [INSTRUCTOR];

export const Routes = userRole => {
    let newRoutes = [...routes];
    if (userRole === "admin") {
        newRoutes = [...newRoutes].concat([...adminRoutes]);
    }
    if (process.env.NODE_ENV === "production") return newRoutes;
    return [...newRoutes].concat([...devRoutes]);
};

export const BuildRoutes = userRole =>
    Routes(userRole).map((route, index) => {
        return (
            <Route
                key={index}
                path={route.path}
                render={props => <route.component {...props} />}
                exact={route.exact}
            />
        );
    });
