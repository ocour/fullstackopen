const Persons = ({ persons, filter }) => {
    // performs a case insensitive filter on persons array
    const filteredList = persons.filter(person =>  
        person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        filteredList.map((person) => 
            <p key={person.name}>{person.name} {person.number}</p>
        )
    )
}

export default Persons;