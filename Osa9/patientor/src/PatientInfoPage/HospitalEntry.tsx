import React from 'react';
import { HospitalEntryType } from '../types';
import { Icon } from 'semantic-ui-react';
import './style.css';
import DiagnosesCodes from './DiagnosesCodes';


const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {

    return (
        <div className='entry'>
            <h3>{entry.date} <Icon name='hospital' size='large' /></h3>
            <p><strong>Specialist: {entry?.specialist}</strong></p>
            <p>{entry.description}</p>
            {entry?.diagnosisCodes?.length === 0 || entry?.diagnosisCodes === undefined ?
                null
                :
                <DiagnosesCodes diagnosisCodes={entry?.diagnosisCodes} />
            }
            {entry?.discharge && <p>Patient is discharged {entry?.discharge.date}. Criteria: {entry?.discharge.criteria}</p>}
        </div>
    );
};

export default HospitalEntry;
