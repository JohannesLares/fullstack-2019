import express from 'express';

import patientService from '../services/patientService';

import toNewPatientEntry from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveData());
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientService.addEntry(newPatientEntry);
        res.json(newPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default patientsRouter;