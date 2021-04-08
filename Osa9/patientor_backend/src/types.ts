export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type NonSensitivePatientEntry =  Omit<PatientEntry, 'ssn'| 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
  }
  
export interface DiagnoseEntry {
  code: string;
    name: string;
    latin?: string;
}

export interface DischargeInterface {
  date: string;
  criteria: string;
}
export interface SickLeaveInterface {
  startDate: string;
  endDate: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export enum EntryEnum {
    HospitalEntry = 'Hospital',
    OccupationalHealthcareEntry = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck',
  }
  
  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge?: DischargeInterface;
  }
  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeaveInterface;
  }
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating?: HealthCheckRating;
  }
  
  
  export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

  export type NewEntry =
    | Omit<HospitalEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>
    | Omit<HealthCheckEntry, 'id'>;

    export interface NewBaseEntry extends Omit<BaseEntry, "id">{
      type: "Hospital"|"OccupationalHealthcare"|"HealthCheck";

      
    }