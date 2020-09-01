import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import QuestionGenerator from "./QuestionGenerator";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.primary.light,
        borderRadius: 10
    },
    row: {
        display: "flex",
        width: "auto",
        height: "auto",
        flexFlow: "row noWrap",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
        borderRadius: 10
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    button: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.light
    }
}));

function QuizComponent({ questions }) {
    const classes = useStyles(Theme);

    const [question, setQuestion] = useState(null);

    const [quizQuestions, setQuizQuestions] = useState([]);
    const [selections, setSelections] = useState([]);

    const correct = () => {
        return selections
            .map((s, i) => s === quizQuestions[i].question.id)
            .reduce(
                (accumulator, currentValue) =>
                    currentValue ? accumulator + 1 : accumulator,
                0
            );
    };
    const total = () =>
        quizQuestions && Boolean(quizQuestions.length)
            ? quizQuestions.length
            : 0;

    function handlePreviousQuestion() {
        setQuestion(prevState => Math.max(prevState - 1, 0));
    }

    function handleNextQuestion() {
        setQuestion(prevState => Math.min(prevState + 1, total() - 1));
    }

    function handleAnswerQuestion(questionNumber, choice) {
        const newSelections = [...selections];
        newSelections[questionNumber] = choice;
        setSelections([...newSelections]);
    }

    useEffect(() => {
        if (questions && Boolean(questions.length)) {
            setQuizQuestions(questions);
            setQuestion(0);
            setSelections(Array(questions.length).fill(null));
        }
    }, [questions]);

    return (
        <div className={clsx(classes.root)}>
            <div
                className={clsx(classes.row)}
                style={{
                    backgroundColor: Theme.palette.secondary.dark
                }}
            >
                <div
                    className={clsx(classes.row)}
                    style={{ margin: Theme.spacing(0) }}
                >
                    <div className={clsx(classes.pad)}>
                        <IconButton
                            onClick={handlePreviousQuestion}
                            disabled={!total() || question <= 0}
                        >
                            <KeyboardArrowLeft
                                style={{ color: Theme.palette.primary.main }}
                            />
                        </IconButton>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <Typography variant="h6" color="primary" align="center">
                            Question{" "}
                            {typeof question === "number" ? question + 1 : 0} of{" "}
                            {total()}
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <IconButton
                            onClick={handleNextQuestion}
                            disabled={!total() || question >= total() - 1}
                        >
                            <KeyboardArrowRight
                                style={{ color: Theme.palette.primary.main }}
                            />
                        </IconButton>
                    </div>
                </div>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h6" color="primary" align="center">
                        Score: {correct()}/{total()} ={" "}
                        {total()
                            ? Math.round(
                                  1000 * (correct() / total()) + Number.EPSILON
                              ) / 10
                            : 0}
                        %
                    </Typography>
                </div>
            </div>

            <div className={clsx(classes.column)}>
                {typeof question === "number" &&
                    quizQuestions &&
                    Boolean(quizQuestions.length) && (
                        <QuestionGenerator
                            selection={selections[question]}
                            setSelection={handleAnswerQuestion}
                            questionNumber={question}
                            question={quizQuestions[question]}
                        />
                    )}
            </div>
        </div>
    );
}

QuizComponent.displayName = "QuizComponent";
QuizComponent.propTypes = {
    questions: PropTypes.array.isRequired
};
export default QuizComponent;
