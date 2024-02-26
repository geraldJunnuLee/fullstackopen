import Button from './Button'

const Buttons = ({
  good,
  setGood,
  neutral,
  setNeutral,
  bad,
  setBad,
  allClicks,
  setAllClicks,
}) => {
  return (
    <div>
      <Button
        text='good'
        value={good}
        onClick={setGood}
        allClicks={allClicks}
        setAllClicks={setAllClicks}
      />
      <Button
        text='neutral'
        value={neutral}
        onClick={setNeutral}
        allClicks={allClicks}
        setAllClicks={setAllClicks}
      />
      <Button
        text='bad'
        value={bad}
        onClick={setBad}
        allClicks={allClicks}
        setAllClicks={setAllClicks}
      />
    </div>
  )
}

export default Buttons
