const Persons = ({ filteredPersonList, handleDeletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersonList.map((person) => (
        <div key={person.id} style={{ display: 'flex' }}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDeletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons
