import React from 'react';
import { Entry } from '../types';
import assertNever from '../utils';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {

        case "Hospital":
            return <HospitalEntry key={entry.id} entry={entry} />;

        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;

        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;

        default:
            return assertNever(entry);
    }
};

export default EntryInfo;
