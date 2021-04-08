import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';
import './style.css';


const HealthCheckRatingIcon: React.FC<{ healthrate: HealthCheckRating }> = ({ healthrate }) => {
    console.log('healtrate');
    console.log(healthrate);
    switch (healthrate) {
        case 0:
            return <>Healt Rating: <Icon color='green' name='heart' /></>;

        case 1:
            return <>Healt Rating: <Icon color='yellow' name='heart' /></>;

        case 2:
            return <>Healt Rating: <Icon color='orange' name='heart' /></>;

        case 3:
            return <>Healt Rating: <Icon color='red' name='heart' /></>;

        default:
            return <></>;
    }

};

export default HealthCheckRatingIcon;
