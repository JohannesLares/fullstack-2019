import diagnosesData from '../data/diagnoses.json';

import { DiagnosesEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesData;

const getEntries = (): Array<DiagnosesEntry> => {
    return diagnoses;
};

const addEntry = (): null => {
    return null;
};

export default {
    getEntries,
    addEntry
};