/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, newPatientEntry, newEntry, HealthCheckRating } from './types';

export const toNewPatientEntry = (object: any): newPatientEntry => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender),
        entries: []
    };
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isGender = (str: any): str is Gender => {
    return Object.values(Gender).includes(str);
}

const parseString = (txt: any): string => {
    if (!txt || !isString(txt)) {
        throw new Error('Inccorrect or missing field. ' + txt);
    }
    return txt;
}

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const validateHealth = (hr: any): HealthCheckRating => {
    if ((!hr && hr !== 0) || !Object.values(HealthCheckRating).includes(hr)) {
        throw new Error('Inccorrect or missing field. ' + hr);
    }
    return hr;
}

const isCorrectType = (type: any): type is newEntry => {
    parseString(type)
    const types = ["OccupationalHealthcare", "Hospital", "HealthCheck"]
    return types.includes(type)
}

const parseType = (type: any) => {
    if(!type || !isCorrectType) {
        throw new Error('Incorrect or missing field' + type)
    }
    if(type === "HealthCheck" || type === "OccupationalHealthcare" || type === "Hospital")
        return type;
    throw new Error('Incorrect or missing field: ' + type)
}

export const toNewEntry = (object: any): newEntry => {
    if (object.type === "HealthCheck") validateHealth(object.healthCheckRating);
    return {
        ...object,
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        type: parseType(object.type)
    }
}