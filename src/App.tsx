import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
// Import the generated route tree
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
const router = createRouter({ routeTree })

import './App.css'
import { useState } from "react";

const API_URL = 'http://192.168.1.10:3000'
const REMOVE_ALL_USERS_URL = `${API_URL}/clean`


function App() {
  const [resetButton, setResetButton] = useState(false);
  const cancelAction = () => {
    setResetButton(false)
  }
  const triggerResetAccounts = () => {
    setResetButton(true);
  }
  const resetAccounts = () => {
    console.log('REseetiting accounts')
    fetch(REMOVE_ALL_USERS_URL).then(res => console.info("everything got well", { res })).catch(err => console.error('Something got wrong', { err }))
  }

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Billar Client Network</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/radacct-logs">
              Radius Accounts
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/radcheck-logs">
              Radius Check
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/radpostauth-logs">
              Radius Post Auth
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/create-new-user">
              Create new user
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {resetButton ?
              <>
                <Button color="default" href="#" variant="flat" onClick={cancelAction}>
                  Cancel Action
                </Button>
                <Button color="danger" href="#" variant="flat" onClick={resetAccounts}>
                  Reset Accont
                </Button>
              </>
              : <>
                <Button color="primary" href="#" variant="flat" onClick={triggerResetAccounts}>
                  Try to RESET Acconts
                </Button>
              </>}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <section>
        <RouterProvider router={router} />
      </section>
    </>
  )
}

export default App
