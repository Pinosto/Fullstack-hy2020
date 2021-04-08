export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
interface DischargeInterface {
  date: string;
  criteria: string;
}
interface SickLeaveInterface {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}
export enum EntryTypesEnum {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export type EntryTypes =
  "Hospital" |
  "OccupationalHealthcare" |
  "HealthCheck";


export interface HospitalEntryType extends BaseEntry {
  type: "Hospital";
  discharge?: DischargeInterface;
}
export interface OccupationalHealthcareEntryType extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveInterface;
}
export interface HealthCheckEntryType extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating?: HealthCheckRating;
}


export type Entry =
  | HospitalEntryType
  | OccupationalHealthcareEntryType
  | HealthCheckEntryType;

  export type NewEntry =
  | Omit<HospitalEntryType, 'id'>
  | Omit<OccupationalHealthcareEntryType, 'id'>
  | Omit<HealthCheckEntryType, 'id'>;

  export interface NewBaseEntry extends Omit<BaseEntry, "id">{
    type: "Hospital"|"OccupationalHealthcare"|"HealthCheck";
  }