import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { updatePatient } from "../state";

import { Icon, Button } from "semantic-ui-react";
import EntryDetails from "../Entry";
import AddEntryModal from "../AddEntryModal";

const PateintPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
    const [gender, setGender] = React.useState<any | undefined>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const { id } = useParams<{ id: string }>();

    const createdEntry = (data: Entry):void => {
        let newPatient = {
            ...patient,
            entries: [
                ...patient?.entries,
                data
            ]
        } as Patient
        setPatient(newPatient)
        dispatch(updatePatient(newPatient));
    }

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientFromApi);
                console.log(patientFromApi);
                dispatch(updatePatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        if(!patients[id] || !patients[id].ssn) {
            fetchPatient();
        } else {
            setPatient(patients[id]);
        }
    }, [id])

    React.useEffect(() => {
        let g: any;
        if (patient === undefined) return
        switch (patient.gender) {
            case "male": 
                g = <Icon name="mars" />
                break;
            case "female":
                g = <Icon name="venus" />
                break;
            default:
                g = <Icon name="genderless" />
                break;
        }
        setGender(g);
    }, [patient])

    if (patient !== undefined && diagnoses) {
        return(
            <>
                <h1>{patient.name} {gender}</h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <AddEntryModal
                    modalOpen={modalOpen}
                    error={error}
                    onClose={closeModal}
                    id={id}
                    createdEntry={createdEntry}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
                {patient.entries.length > 0 &&
                    <>
                        <h3>Entries</h3>
                        {patient.entries.map(entry =>
                            <EntryDetails entry={entry} />
                        )}
                    </>
                }
            </>
        )
    } else {
        return (
            <>
                Loading...
            </>
        )
    }
}

export default PateintPage;