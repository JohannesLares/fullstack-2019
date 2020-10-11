import React from "react";
import Part from "./Part"
import { CoursePart } from "../types";

interface contentProps {
    content: {
        name: string,
        exerciseCount: number,
        description?: string,
        groupPrjoectCount?: number,
        exerciseSubmissionLink?: string
    }[]
}

const Content: React.FC<contentProps> = (props) => {
    return (<>
        {props.content.map(part => {
            let p = part as CoursePart
            return (<Part {...p} />)
        })}
    </>)
}

export default Content;