import express from 'express';
import patientServise from '../services/patientServise';
import toNewPatientEntry from '../utils';
import { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServise.getNonSentiveEntries());
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientServise.getPatientById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }

});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const PatientEntry = patientServise.addPatientEntry(newPatientEntry);
    res.json(PatientEntry);
  } catch (e) {

    res.status(400).send({ error: e.message as string });
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    const patient = patientServise.getPatientById(id);
    const newEntry = toNewEntry(req.body);
    const updatedPatientEntry = patientServise.addNewEntryToPatient(newEntry, patient);
    res.json(updatedPatientEntry);
  } catch (e) {
    res.status(400).send({ error: e.message as string });
  }
});

export default router;