import React from "react"

const PersonForm = ({ addPerson, newName, handlePersonAdd, newNumber, handleNumberAdd }) => {

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName}
                    onChange={handlePersonAdd} />
                <br />
                number:<input value={newNumber}
                    onChange={handleNumberAdd} />
                <br />
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm