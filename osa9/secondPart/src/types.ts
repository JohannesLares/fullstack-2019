export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string,
    entries: Entry[]
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type newPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type Entry =
    | HealthCheckEntry
    | HospitalEntry
    | OccupationalHealthcareEntry

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>

interface BaseEntry {
    type: string;
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesEntry['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge?: {
        date: string,
        criteria: string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName?: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export type newEntry = Omit<Entry, 'id'>