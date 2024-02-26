const PersonForm = ({
  newName,
  newPhoneNumber,
  handleSetName,
  handleSetNewPhoneNumber,
  handleAddNewName,
}) => {
  return (
    <form onSubmit={handleAddNewName}>
      <div>
        name: <input value={newName} onChange={handleSetName} />
      </div>
      <div>
        number:
        <input value={newPhoneNumber} onChange={handleSetNewPhoneNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
