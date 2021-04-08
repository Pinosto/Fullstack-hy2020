import axios from 'axios';
import React, { useEffect } from 'react';

import EntryInfo from './EntryInfo';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { useParams } from 'react-router';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
import { Entry, Patient } from '../types';
import { Icon, Button } from 'semantic-ui-react';
import { isEmptyArray } from 'formik';


const PatientInfoPage = () => {

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    const { id } = useParams<{ id: string }>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };


    useEffect(() => {
        const fetchPatient = async () => {
            console.log('fetch');
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientFromApi);
                dispatch(updatePatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        const findPatient = Object.values(patients).find((p) => p.id === id);

        if (findPatient?.ssn === undefined) {
            void fetchPatient();
        } else {
            setPatient(findPatient);
        }

    }, [dispatch]);


  const submitNewEntry = async (values: EntryFormValues) => {
      
    try {
      const { data: patientFromApi } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('newEntry');
      console.log(patientFromApi);
      setPatient(patientFromApi);
      dispatch(updatePatient(patientFromApi));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

    const genderIcon = (gender: string) => {
        console.log(patients);
        if (gender === 'other') {
            return <Icon size='large' name='venus mars' />;
        }
        if (gender === 'female') {
            return <Icon size='large' name='venus' />;
        }
        if (gender === 'male') {
            return <Icon size='large' name='mars' />;
        }

    };

    return (
        <div>
            <h2>Patient Info</h2>
            {patient ?
                <div>
                    <h3>{patient.name} {genderIcon(patient.gender)}</h3>
                    <p>occupation: {patient.occupation}
                        <br />ssn: {patient.ssn}</p>
                    <h3>Entries</h3>
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button onClick={() => openModal()}>Add New Entry</Button>
                    {isEmptyArray(patient?.entries) ?
                        <p>no entries</p>
                        :
                        patient?.entries?.map((e: Entry) => <EntryInfo key={e.id} entry={e} />)
                    }
                </div>
                :
                <p>loading...</p>
            }
        </div>
    );


};

export default PatientInfoPage;
