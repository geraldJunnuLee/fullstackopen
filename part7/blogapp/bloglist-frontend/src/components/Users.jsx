import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <Box>
      <Typography variant="h5">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '200px' }}>&nbsp;</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
