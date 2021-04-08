import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckEntryType } from '../types';
import DiagnosesCodes from './DiagnosesCodes';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {

    return (
        <div className='entry'>
            <h3>{entry.date} <Icon name='stethoscope' size='large' /></h3>
            <p><strong>Specialist: {entry?.specialist}</strong></p>
            <p>{entry.description}</p>
            {entry?.diagnosisCodes?.length === 0 || entry?.diagnosisCodes === undefined ?
                null
                :
                <DiagnosesCodes diagnosisCodes={entry?.diagnosisCodes} />
            }
            {entry?.healthCheckRating !== undefined ?<><HealthCheckRatingIcon healthrate={entry.healthCheckRating} /></> : null}
        </div>
    );
};

export default HealthCheckEntry;
