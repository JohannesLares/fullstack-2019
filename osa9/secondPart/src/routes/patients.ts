import express from 'express';

import patientService from '../services/patientService';

import { toNewEntry, toNewPatientEntry } from '../utils';

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

patientsRouter.get('/:id', (req,res) => {
    const patients = patientService.getEntries();
    const patient = patients.find(p => p.id === req.params.id);
    if (patient) {
        if (!patient.entries)
            patient.entries = [];
        res.send(patient);
    } else {
        res.status(404);
    }
})

patientsRouter.post('/:id/entries', (req,res) => {
    const id = req.params.id as string;
    const newEntryForPatient = toNewEntry(req.body);

    const newE = patientService.addNewEntryToPatient(newEntryForPatient, id);
    res.json(newE)    
})

export default patientsRouter;