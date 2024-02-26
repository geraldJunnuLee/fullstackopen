const Button = ({ text, value, onClick, allClicks, setAllClicks }) => {
  return (
    <button
      onClick={() => {
        onClick(value + 1), setAllClicks(allClicks + 1)
      }}
    >
      {text}
    </button>
  )
}

export default Button
