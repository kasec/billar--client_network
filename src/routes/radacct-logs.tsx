import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/radacct-logs')({
  component: ConnectedList,
})

// move this to an env file
// API_URL might change, we need to ask to the server through ip route
const API_URL = import.meta.env.VITE_API_URL
const CONNECTED_USERS_URL = `${API_URL}/get-radacct`

function ConnectedList() {
  const [users, setUsers] = useState<unknown | Record<string, unknown>[]>(null)
  useEffect(() => {
    fetch(CONNECTED_USERS_URL)
      .then((res) => res.json())
      .then((res) => setUsers(Array.isArray(res) ? res : []))
  }, [])

  console.log('Rendering Connected List', { users })

  if (!Array.isArray(users)) {
    return <div className="p-2">Display connected users list</div>
  }

  if (!users.length) {
    return <div className="p-2">User list should be here, but it's empty</div>
  }

  return (
    <Table isStriped className='mt-5'>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>Start time</TableColumn>
        <TableColumn>Stop time</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map(user => <TableRow key={user.radacctid}>
          <TableCell>{user.username}</TableCell>
          <TableCell>{new Date(user.acctstarttime).toUTCString()}</TableCell>
          <TableCell>{user.acctstoptime && new Date(user.acctstoptime).toUTCString()}</TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  )
}
