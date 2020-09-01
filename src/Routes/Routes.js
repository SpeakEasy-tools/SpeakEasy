import React, { lazy } from "react";
import { Route } from "react-router";

import Home from "../Views/Pages/Home/Home";

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
    component: lazy(() => import("../Views/Pages/Instructor/Instructor"))
};

export const TWENTY_FORTY_EIGHT = {
    path: "/2048",
    name: "2048",
    component: lazy(() =>
        import("../Views/Games/TwentyFortyEight/TwentyFortyEight")
    )
};
export const EYE_SPY = {
    path: "/eye_spy",
    name: "Eye Spy",
    component: lazy(() => import("../Views/Games/EyeSpy/EyeSpy"))
};
export const MEMORY = {
    path: "/memory",
    name: "Memory",
    component: lazy(() => import("../Views/Games/Memory/Memory"))
};
export const SUDOKU = {
    path: "/sudoku",
    name: "Sudoku",
    component: lazy(() => import("../Views/Games/Sudoku/Sudoku"))
};
export const TILE_SLIDER = {
    path: "/tile_slider",
    name: "Tile Slider",
    component: lazy(() => import("../Views/Games/TileSlider/TileSlider"))
};

export const ABOUT = {
    path: "/about",
    name: "About",
    component: lazy(() => import("../Views/Pages/About/About"))
};

export const ATTRIBUTIONS = {
    path: "/attributions",
    name: "Attributions",
    component: lazy(() => import("../Views/Pages/Attributions/Attributions"))
};
export const CONTACT = {
    path: "/contact",
    name: "Contact",
    component: lazy(() => import("../Views/Pages/Contact/Contact"))
};
export const FAQS = {
    path: "/faq",
    name: "FAQ",
    component: lazy(() => import("../Views/Pages/FAQ/FAQ"))
};
export const HELP = {
    path: "/help",
    name: "Help",
    component: lazy(() => import("../Views/Pages/Help/Help"))
};
export const PEOPLE = {
    path: "/people",
    name: "People",
    component: lazy(() => import("../Views/Pages/People/People"))
};
export const PROFILE = {
    path: "/profile",
    name: "Profile",
    component: lazy(() => import("../Views/Pages/Profile/Profile"))
};
export const COCO_EXPLORER = {
    path: "/coco_explorer",
    name: "Coco Explorer",
    component: lazy(() => import("../Views/Tools/CocoExplorer/CocoExplorer"))
};
export const DICTIONARY = {
    path: "/dictionary",
    name: "Dictionary",
    component: lazy(() => import("../Views/Tools/Dictionary/Dictionary"))
};
export const FLASHCARDS = {
    path: "/flashcards",
    name: "Flashcards",
    component: lazy(() => import("../Views/Tools/Flashcards/Flashcards"))
};
export const POP_QUIZ = {
    path: "/pop_quiz",
    name: "Pop Quiz",
    component: lazy(() => import("../Views/Tools/PopQuiz/PopQuizView"))
};
export const TIME_SERIES = {
    path: "/time_series",
    name: "Time Series Analyzer",
    component: lazy(() => import("../Views/Tools/TimeSeries/TimeSeries"))
};
export const TONE_TRAINER = {
    path: "/tone_trainer",
    name: "Tone Trainer",
    component: lazy(() =>
        import("../Views/Tools/ToneTrainerView/ToneTrainerView")
    )
};
export const WORD_SEARCH = {
    path: "/word_search",
    name: "Word Search",
    component: lazy(() => import("../Views/Games/WordSearch/WordSearch"))
};

export const MODULES = {
    path: "/modules",
    name: "Module management",
    component: lazy(() => import("../Views/Pages/Modules/Modules"))
};

export const PAGE404 = {
    path: "*",
    name: "404",
    component: lazy(() => import("../Views/Pages/Page404/Page404"))
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
    ATTRIBUTIONS,
    CONTACT,
    FAQS,
    HELP,
    HOME,
    PEOPLE,
    PROFILE,
    COCO_EXPLORER,
    DICTIONARY,
    FLASHCARDS,
    POP_QUIZ,
    TIME_SERIES,
    TONE_TRAINER,
    WORD_SEARCH
];

const devRoutes = [MODULES];
const adminRoutes = [INSTRUCTOR];

export const Routes = allowedRoles => {
    let newRoutes = [...routes];
    if (allowedRoles.includes("admin")) {
        newRoutes = newRoutes.concat(adminRoutes);
    }
    if (allowedRoles.includes("dev")) {
        newRoutes = newRoutes.concat(devRoutes);
    }
    newRoutes.push(PAGE404);
    return newRoutes;
};

export const BuildRoutes = allowedRoles =>
    Routes(allowedRoles).map((route, index) => {
        return (
            <Route
                key={index}
                path={route.path}
                render={props => <route.component {...props} />}
                exact={route.exact}
            />
        );
    });
