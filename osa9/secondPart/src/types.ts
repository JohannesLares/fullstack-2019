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
    ssn: string
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type newPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}