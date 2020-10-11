import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

const Part: React.FC<CoursePart> = props => {
    switch (props.name) {
        case "Fundamentals":
            return (<p>{props.name} | {props.exerciseCount} | {props.description}</p>)
            break;
        case "Using props to pass data":
            return (<p>{props.name} | {props.exerciseCount} | {props.groupProjectCount}</p>)
            break;
        case "Deeper type usage":
            return (<p>{props.name} | {props.exerciseCount} | {props.description} | {props.exerciseSubmissionLink}</p>)
            break;
        case "Not today my friend":
            return (<p>{props.name} | {props.exerciseCount} | {props.description} | {props.isThisReal}</p>)
            break;
        default:
            return assertNever(props)
    }
}

export default Part;