import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/radacct-logs')({
  component: ConnectedList,
})

// move this to an env file
// API_URL might change, we need to ask to the server through ip route
const API_URL = 'http://192.168.1.10:3000'
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
    <section>
      <div className="p-2">Print users here</div>
    </section>
  )
}
