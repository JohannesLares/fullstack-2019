import React from "react";
import { Entry } from "../types";
import { Segment, Icon } from "semantic-ui-react";

const OccupationalHealthcareEntry: React.FC<{entry: Entry}> = ({ entry }) => {
    return (
        <Segment>
            <h2>{entry.date} <Icon name="user md" /></h2>
            <p>{entry.description}</p>
        </Segment>
    )
}

export default OccupationalHealthcareEntry