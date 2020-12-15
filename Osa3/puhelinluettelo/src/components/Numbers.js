import React from "react"

const Numbers = ({ persons, filter, removePerson }) => {

    const filteredPerson = persons.filter(person => (person.name.toLowerCase().includes(filter.toLowerCase())))

    return (
        <ul>
            {filteredPerson.map(({ id, name, number }) =>
                <li key={id}>{name}: {number} <button key={id} onClick={(()=>removePerson(id,name))}>delete</button></li>
            )}
        </ul>
    )
}

export default Numbers