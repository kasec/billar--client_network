import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
// Import the generated route tree
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
const router = createRouter({ routeTree })

import './App.css'
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL
const REMOVE_ALL_USERS_URL = `${API_URL}/clean`


function App() {
  const [resetButton, setResetButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const menuItems = [
    { label: 'Radius Accounts', url: '/radacct-logs' },
    { label: 'Radius Check', url: '/radcheck-logs' },
    { label: 'Radius Post Auth', url: '/radpostauth-logs' },
    { label: 'Create new user', url: '/create-new-user' }
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.label}>
              <Link
                className="w-full"
                color="foreground" underline="always"
                href={item.url}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarBrand>
          <p className="font-bold text-inherit">Client Network</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" underline="always" href="/radacct-logs">
              Radius Accounts
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" underline="always" href="/radcheck-logs">
              Radius Check
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" underline="always" href="/radpostauth-logs">
              Radius Post Auth
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" underline="always" href="/create-new-user">
              Create new user
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
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
                  Try to RESET Accounts
                </Button>
              </>}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <section className="flex justify-center">
        <RouterProvider router={router} />
      </section>
    </>
  )
}

export default App
