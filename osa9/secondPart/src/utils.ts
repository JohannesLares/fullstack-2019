/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, newPatientEntry } from './types';

const toNewPatientEntry = (object: any): newPatientEntry => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender)
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

export default toNewPatientEntry;