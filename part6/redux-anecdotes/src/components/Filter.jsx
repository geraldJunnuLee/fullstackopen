import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import Notification from './Notification'

const Filter = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    dispatch(filterChange(target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification ? (
        <Notification notification={notification} />
      ) : (
        <div>
          filter <input onChange={handleChange} />
        </div>
      )}
    </div>
  )
}

export default Filter
