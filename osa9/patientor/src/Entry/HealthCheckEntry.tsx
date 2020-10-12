import React from "react";
import { Entry } from "../types";
import { Icon, Segment } from "semantic-ui-react";

const HealthCheck: React.FC<{entry: Entry}> = ({ entry }) => {
    let hrts = [];
    if (entry.type === "HealthCheck") {
        for (let i = 3; i >= entry.healthCheckRating; i--) {
            hrts.push(<Icon name="heart" />)
        }
    }
    return (
        <Segment>
            <h2>{entry.date} <Icon name="stethoscope" /></h2>
            <p>{entry.description}</p>
            {hrts}
        </Segment>
    )
}

export default HealthCheck