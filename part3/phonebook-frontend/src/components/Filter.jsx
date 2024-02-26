const Filter = ({ searchNameValue, handleSearchNameValue }) => {
  return (
    <div>
      <p>filter shown with</p>
      <input value={searchNameValue} onChange={handleSearchNameValue} />
    </div>
  )
}

export default Filter
