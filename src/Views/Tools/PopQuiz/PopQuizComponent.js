import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RandomSample, Shuffle, Theme } from "../../../utils";
import clsx from "clsx";
import QuizComponent from "./QuizComponent";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    }
}));

function PopQuizComponent({ topics }) {
    document.title = "Pop Quiz";
    const classes = useStyles(Theme);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (topics && Boolean(topics.length)) {
            const max = 20;
            const min = 5;
            const quizLengthRange = Math.random() * (max - min) + min;
            const trimmedTopics = RandomSample(topics, quizLengthRange);
            setQuestions(
                trimmedTopics.map(t => {
                    return {
                        question: t,
                        options: Shuffle([...RandomSample(topics, 3), t])
                    };
                })
            );
        }
    }, [topics]);
    return (
        <div className={clsx(classes.root)}>
            <QuizComponent questions={questions} />
        </div>
    );
}

PopQuizComponent.displayName = "PopQuizComponent";
PopQuizComponent.propTypes = {
    topics: PropTypes.array.isRequired
};
export default PopQuizComponent;
