import patientData from '../data/patients';

import { Patient, NonSensitivePatientData, newPatientEntry, newEntry, Entry } from '../types';

import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveData = (): Array<NonSensitivePatientData> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
        return { id, name, dateOfBirth, gender, occupation, entries };
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

const addNewEntryToPatient = (entry: newEntry, id: string): Entry => {
    const newEntryToP = {
        id: uuid(),
        ...entry
    } as Entry;
    let pushed: boolean = false
    patientData.forEach(pat => {
        if(pat.id === id) {
            pat.entries.push(newEntryToP);
            pushed = true;
        }
    })
    if(pushed)
        return newEntryToP;
    throw new Error('invalid id: ' + id)
}

export default {
    getEntries,
    getNonSensitiveData,
    addEntry,
    addNewEntryToPatient
};