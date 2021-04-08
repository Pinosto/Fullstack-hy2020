import patientData from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';


const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSentiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string) => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return patient;
  }
  throw new Error('Invalid patient ID.');
};

const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id: id,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntryToPatient = (entry: NewEntry, patient: PatientEntry) => {
  const entryId: string = uuid();
  const newEntry = { ...entry, id: entryId };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  getNonSentiveEntries,
  getPatientById,
  addPatientEntry,
  addNewEntryToPatient
};