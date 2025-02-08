import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/radcheck-logs')({
  component: ConnectedList,
})

// move this to an env file
// API_URL might change, we need to ask to the server through ip route
const API_URL = import.meta.env.VITE_API_URL
const CONNECTED_USERS_URL = `${API_URL}/get-radcheck`

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
      </TableHeader>
      <TableBody>
        {users.map(user => <TableRow key={user.id}>
          <TableCell>{user.username}</TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  )
}
