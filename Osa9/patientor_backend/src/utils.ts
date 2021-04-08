import { NewBaseEntry, NewPatientEntry, Gender, Entry, EntryEnum, NewEntry, DischargeInterface, SickLeaveInterface, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
    return Object.values(EntryEnum).includes(entry.type);
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries)) {
        return [];
    }
    entries.map((e: Entry) => {
        console.log(e);
        if (!isEntry(e)) {
            throw new Error('Incorrect or missing Entries' + JSON.stringify(e));
        }
        return e;
    });
    return entries as Entry[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (type: any): type is EntryEnum => {
    return Object.values(EntryEnum).includes(type);
};

const parseType = (type: unknown): EntryEnum => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing entry type');
    }
    return type;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseEntryDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if (!diagnosisCodes) {
        return [];
    }
    if (!Array.isArray(diagnosisCodes)) {
        throw new Error("Incorrect diagnosisCodes");
    }

    if (!diagnosisCodes.every((diagnosisCode) => isString(diagnosisCode))) {
        throw new Error("Incorrect diagnosisCodes");
    }
    return diagnosisCodes as string[];
};

const isCriteria = (text: string): boolean => {
    if(isString(text))return true;
    return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): boolean => {
        if (!discharge.date) return false;
        if (!discharge.criteria) return false;
        if (!isDate(discharge.date)) return false;
        if (!isCriteria(discharge.criteria)) return false;
        return true;
};

const parseDischarge = (discharge: unknown): DischargeInterface|undefined => {
    if(discharge===undefined)return discharge;
    
    if ( !isDischarge(discharge)) {
        throw new Error('Incorrect discharge');
    }
    return discharge as DischargeInterface;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): boolean => {
        if (!sickLeave.startDate) return false;
        if (!sickLeave.endDate) return false;
        if (!isDate(sickLeave.startDate)) return false;
        if (!isDate(sickLeave.endDate)) return false;
        return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeaveInterface |undefined=> {
    if(sickLeave===undefined)return sickLeave;
    if (!isSickLeave(sickLeave)) {
        throw new Error('Incorrect sickLeave');
    }
    return sickLeave as SickLeaveInterface;
};


const parseEmployerName = (employer: unknown): string => {
    if (!employer || !isString(employer)) {
        throw new Error('Incorrect or missing employer');
    }
    return employer;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating|undefined => {
    if(healthCheckRating===undefined)return healthCheckRating;
    return healthCheckRating as HealthCheckRating;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {

    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries) || [],
    };

    return newEntry;
};

type EntryFields = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown,
    type: unknown,
    discharge: unknown,
    employerName: unknown,
    sickLeave: unknown,
    healthCheckRating: unknown
};

export const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, discharge, employerName, sickLeave, healthCheckRating }: EntryFields): NewEntry => {

    const newEntry: NewBaseEntry = {

        description: parseDescription(description),
        date: parseEntryDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        type: parseType(type)
    };    

    switch (newEntry.type) {

        case "Hospital":
            return {
                ...newEntry,
                discharge: parseDischarge(discharge)
            }as NewEntry;
        case "OccupationalHealthcare":
            return {
                ...newEntry,
                employerName: parseEmployerName(employerName),
                sickLeave: parseSickLeave(sickLeave)
            }as NewEntry;
        case "HealthCheck":
            return {
                ...newEntry,
                healthCheckRating: parseHealthCheckRating(healthCheckRating)
            }as NewEntry;

        default:
            return assertNever(newEntry.type);
    }

};

export default toNewPatientEntry;
