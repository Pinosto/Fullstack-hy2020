import React from 'react';
import { OccupationalHealthcareEntryType } from '../types';
import { Icon } from 'semantic-ui-react';
import './style.css';
import DiagnosesCodes from './DiagnosesCodes';

const OccupationalHealthcareEntryPage: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({ entry }) => {

    return (
        <div className='entry'>
            <h3>{entry.date} <Icon name='doctor' size='large' /></h3>
            <p><strong>Specialist: {entry?.specialist}</strong></p>
            <p>{entry.description}</p>
            {entry?.diagnosisCodes?.length === 0 || entry?.diagnosisCodes === undefined ?
                null
                :
                <DiagnosesCodes diagnosisCodes={entry?.diagnosisCodes} />
            }
            {entry?.sickLeave && <>Sick leave from: <strong>{entry?.sickLeave.startDate}</strong> to: <strong>{entry?.sickLeave.endDate}</strong></>}

        </div>
    );
};

export default OccupationalHealthcareEntryPage;
