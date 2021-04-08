import React from 'react'
import { CoursePart } from '../types'
import assertNever from '../utils'

const Part = ({ part }: { part: CoursePart }) => {

    switch (part.type) {
        case "normal":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong>
                        <br /><i>{part.description}</i></p>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong>
                        <br />project exercises {part.groupProjectCount}</p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong>
                        <br /><i>{part.description}</i>
                        <br />submit to {part.exerciseSubmissionLink}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong>
                        <br /><i>{part.description}</i>
                        <br />required skils: {part.requirements}</p>
                </div>
            )
        default:
            return assertNever(part);
    }



}

export default Part
