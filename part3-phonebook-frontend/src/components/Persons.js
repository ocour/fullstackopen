const Persons = ({ persons, filter, onDelete }) => {
    // performs a case insensitive filter on persons array
    
    const filteredList = persons.filter(person =>  
        person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        filteredList.map((person) => 
            <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => onDelete(person.id)} >delete</button>
            </p>
        )
    )
}

export default Persons;