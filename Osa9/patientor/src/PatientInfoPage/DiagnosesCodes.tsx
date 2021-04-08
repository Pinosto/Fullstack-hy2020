/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { useStateValue } from '../state';

const DiagnosesCodes:React.FC<{diagnosisCodes:Array<string>}> =({diagnosisCodes}) => {
    const [{ diagnosis }] = useStateValue();
    return (
            <div>Diagnoses:
                <ul>
                {diagnosisCodes.map((dcode) => {
                    const diag = Object.values(diagnosis).find((d) => d.code === dcode);
                    return <li key={diag?.code}> {diag?.code} {diag?.name}. Latin: {diag?.latin} </li>;
                })}
                </ul>
            </div>
    );
};

export default DiagnosesCodes;
