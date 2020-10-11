import patientData from '../data/patients.json';

import { Patient, NonSensitivePatientData, newPatientEntry } from '../types';

import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveData = (): Array<NonSensitivePatientData> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};

const addEntry = ( entry: newPatientEntry ): Patient => {
        const newPatientEntry = {
            id: uuid(),
            ...entry
        };

        patientData.push(newPatientEntry);
        return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveData,
    addEntry
};