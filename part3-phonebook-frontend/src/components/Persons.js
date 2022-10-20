const Persons = ({ persons, filter, onDelete }) => {
    // performs a case insensitive filter on persons array
    
    const filteredList = persons.filter(person =>  
        person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="flex flex-col text-xl font-medium px-6 py-4 shadow-md bg-sky-300 rounded-lg my-2 text-gray-600">
            <h2 className="text-2xl font-bold py-2">Numbers</h2>
            {filteredList.map((person) => 
                <div className="grid grid-cols-7 my-2 rounded-xl bg-sky-100 py-2 px-4 items-baseline" key={person.name}>
                    <p className="col-span-3">Name: {person.name}</p>
                    <p className="col-span-3">Num: {person.number}</p>
                    <button className="col-span-1 bg-sky-200 text-gray-400 rounded-lg 
                        py-2 hover:bg-sky-300 hover:text-black" onClick={() => onDelete(person.id)}>
                        X
                    </button>
                </div>
            )}
        </div>
    )
}

//text-xl font-medium px-6 py-4 shadow-md bg-sky-300 rounded-lg my-2

export default Persons;