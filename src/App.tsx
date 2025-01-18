import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import './App.css'

function App() {
  return (
    <>
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit">Billar Client Network</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Connected Users
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="#">
              Create new user
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Reset database
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <section>

      </section>
    </>
  )
}

export default App
