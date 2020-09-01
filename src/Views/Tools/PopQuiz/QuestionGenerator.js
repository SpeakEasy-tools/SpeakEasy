import PropTypes from "prop-types";
import { RandomSample, Theme } from "../../../utils";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Check, Clear } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10
    },
    row: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        borderRadius: 10,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        justifyContent: "center",
        alignItems: "center"
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        border: `2px solid ${theme.palette.secondary.main}`
    },
    option: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        borderRadius: 10,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        border: `2px solid ${theme.palette.secondary.main}`,
        justifyContent: "center",
        alignItems: "center"
    },
    element: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    selected: {
        border: `2px solid ${theme.palette.secondary.dark}`
    },
    correct: { backgroundColor: "green" },
    incorrect: { backgroundColor: "red" },
    icon: {
        color: theme.palette.secondary.main
    }
}));

function QuestionGenerator({
    questionNumber,
    question,
    selection,
    setSelection
}) {
    const classes = useStyles(Theme);

    const [questionContent, setQuestionContent] = useState(null);
    const [questionOptions, setQuestionOptions] = useState([]);

    const [questionKey, setQuestionKey] = useState(null);
    const [answerKey, setAnswerKey] = useState(null);

    const [correctId, setCorrectId] = useState(null);
    const [selectionId, setSelectionId] = useState(null);

    function handleSelection(selection) {
        setSelection(questionNumber, selection);
    }

    useEffect(() => {
        if (
            question &&
            Boolean(Object.keys(question).length) &&
            "question" in question &&
            "options" in question
        ) {
            const keys = Object.keys(question.question).filter(k => k !== "id");

            const qKey = RandomSample(keys, 1)[0];
            const aKey = RandomSample(
                keys.filter(k => k !== qKey),
                1
            )[0];

            setQuestionContent(question.question);
            setQuestionOptions(question.options);

            setQuestionKey(qKey);
            setAnswerKey(aKey);
            setCorrectId(question.question.id);

            setSelectionId(null);
        }
    }, [question]);

    useEffect(() => {
        if (typeof selection === "string") {
            setSelectionId(selection);
        }
    }, [selection]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.column)}>
                    <div
                        className={clsx(classes.pad)}
                    >{`Match the ${questionKey} with its ${answerKey}:`}</div>

                    <div className={clsx(classes.pad)}>
                        {questionContent &&
                            Boolean(Object.keys(questionContent).length) &&
                            questionKey in questionContent &&
                            questionContent[questionKey]}
                    </div>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.column)}>
                    {questionOptions &&
                        Boolean(questionOptions.length) &&
                        questionOptions.map(q => (
                            <div key={q.id} className={clsx(classes.option)}>
                                <div className={clsx(classes.pad)}>
                                    <IconButton
                                        className={clsx(classes.button)}
                                        onClick={() => handleSelection(q.id)}
                                        disabled={
                                            typeof selectionId === "string"
                                        }
                                    >
                                        <Checkbox
                                            className={clsx(classes.icon, {
                                                [classes.correct]:
                                                    typeof selectionId ===
                                                        "string" &&
                                                    correctId === q.id,
                                                [classes.incorrect]:
                                                    typeof selectionId ===
                                                        "string" &&
                                                    selectionId === q.id &&
                                                    correctId !== q.id,
                                                [classes.selected]:
                                                    typeof selectionId ===
                                                        "string" &&
                                                    selectionId === q.id
                                            })}
                                            checked={
                                                typeof selectionId === "string"
                                            }
                                            checkedIcon={
                                                typeof selectionId ===
                                                    "string" &&
                                                correctId === q.id ? (
                                                    <Check />
                                                ) : (
                                                    <Clear />
                                                )
                                            }
                                        />
                                    </IconButton>
                                </div>
                                <div className={clsx(classes.pad)}>
                                    {q[answerKey]}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

QuestionGenerator.displayName = "QuestionGenerator";
QuestionGenerator.propTypes = {
    questionNumber: PropTypes.number.isRequired,
    question: PropTypes.object.isRequired,
    setSelection: PropTypes.func.isRequired,
    selection: PropTypes.string
};
export default QuestionGenerator;
