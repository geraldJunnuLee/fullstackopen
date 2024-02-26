import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserDetails } from '../reducers/userReducer'

import { Box, Typography } from '@mui/material'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(fetchUserDetails(id))
  }, [])

  return (
    <Box>
      {user && (
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="h6">added blogs</Typography>
          <ul>
            {user.blogs.map((blog, i) => (
              <li key={i}>{blog.title}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  )
}

export default User
