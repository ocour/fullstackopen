const PersonForm = ({ addNewPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
    return (
    <div className="shadow-md bg-sky-300 p-6 rounded-lg text-gray-600">
        <h2 className="text-2xl font-bold pb-1">Add a new entry</h2>
        <form className="text-xl font-medium" onSubmit={addNewPerson}>
            <div>
                <p>name: </p>
                <input className="my-2 px-2 py-1 border-2 rounded-lg border-sky-200 shadow-md focus:outline-2 focus:outline-sky-400" value={newName} onChange={handleNewName} placeholder="name"/>
            </div>
            <div>
                <p>number: </p>
                <input className="my-2 px-2 py-1 border-2 rounded-lg border-sky-200 shadow-md focus:outline-2 focus:outline-sky-400" value={newNumber} onChange={handleNewNumber} placeholder="040-1234567"/>
            </div>
            <div>
                <button className="px-10 py-2 mt-2 rounded-lg bg-sky-400 text-gray-600 hover:text-black hover:bg-sky-200" type="submit">
                    Add
                </button>
            </div>
        </form>
    </div>
    )
}

export default PersonForm;