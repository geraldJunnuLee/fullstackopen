import { useResource } from './hooks'

const App = () => {
  const [notes, noteService] = useResource(
    'http://localhost:3005/notes',
    'notes'
  )
  const [persons, personService] = useResource(
    'http://localhost:3005/persons',
    'person'
  )

  const { create: createNote, ...noteInputParameters } = noteService
  const { create: createPerson, ...personInputParameters } = personService

  const personNameInput = {
    ...personInputParameters,
    value: personInputParameters.value.name,
    id: 'name',
  }
  const personNumberInput = {
    ...personInputParameters,
    value: personInputParameters.value.number,
    id: 'number',
  }

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    createNote({ content: noteService.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    createPerson(personInputParameters.value)
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...noteInputParameters} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...personNameInput} /> <br />
        number <input {...personNumberInput} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
