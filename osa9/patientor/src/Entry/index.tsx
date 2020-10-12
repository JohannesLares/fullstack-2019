import React from "react";
import { Entry } from "../types";
import HealthCheck from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (entry: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
    )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
}

export default EntryDetails;