import React from "react";
import { Entry } from "../types";
import { Segment, Icon } from "semantic-ui-react";

const HospitalEntry: React.FC<{entry: Entry}> = ({ entry }) => {
    return (
        <Segment>
            <h2>{entry.date} <Icon name="hospital" /></h2>
            <p>{entry.description}</p>
        </Segment>
    )
}

export default HospitalEntry