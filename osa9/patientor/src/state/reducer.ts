import { State } from "./state";
import { DiagnosesEntry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: DiagnosesEntry[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const pats = {...state.patients}
      pats[action.payload.id] = action.payload;
      return {
        ...state,
        patients: {
          ...pats  
        }
      }
    case "SET_DIAGNOSES": 
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce((memo, diag) => ({...memo, [diag.code]: diag}), {}),
          ...state.diagnoses
        }
      }
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  }
}

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  }
}

export const updatePatient = (payload: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload
  }
}

export const setDiagnoses = (payload: DiagnosesEntry[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload
  }
}