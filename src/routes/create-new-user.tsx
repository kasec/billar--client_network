import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import {Form, Input, Button, Card, CardHeader, CardBody, CardFooter} from "@heroui/react";

export const Route = createFileRoute('/create-new-user')({
  component: CreateNewUser,
})

// move this to an env file
// API_URL might change, we need to ask to the server through ip route
const API_URL = import.meta.env.VITE_API_URL
const CREATE_USER_URL = `${API_URL}/create-user`

const STATES = {
  INITIAL: 'INITIAL',
  USER_ADDED: 'USER_ADDED',
  ERROR: 'ERROR',
  LOADING: 'LOADING'
}
type UserCardProps = { user: string, password: string, onClick: () => void }

const UserCard = ({ user, password, onClick }: UserCardProps) => {
  return (    
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between bg-green-500">
        <div className="flex gap-5 ">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-white">Usuario agregado exitosamente</h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
          <p className='my-3'>Asegura copiar el usuario y contrasena antes de cerrar esta ventana, porque esta sera la unica vez que lo veas</p>
          <Button onPress={onClick}>Volver a crear usuario</Button>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">Password:</p>
          <p className=" text-default-400 text-small">{password}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">Usuario:</p>
          <p className=" text-default-400 text-small">{user}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

function CreateNewUser() {
  const [state, setState] = useState(STATES.INITIAL)
  // ts should be 7 digits, so I need to verify it, otherwise, add 0
  const passts = (Date.now() % 10000000).toString().padStart(7, '0')
  const userts = (((Date.now() % 100) * Date.now()) % 1000).toString().padStart(4, '0')
  const [username, setUsername] = useState(`user_${userts}`);
  const [password, setPassword] = useState(passts);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(CREATE_USER_URL, { 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username, password }) 
    }).then(resp => resp.json())
    // TO-DO add succesfull message and credentials just once
    .then(() => setState(STATES.USER_ADDED))
    .catch(err => {
      setState(STATES.ERROR)
      console.error("Something went wrong", err)
    })
  };

  if (state === STATES.USER_ADDED) {
    return <UserCard user={username} password={password} onClick={() => setState(STATES.INITIAL)} />
  } 

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md mt-10">
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          value={username}
          name="username"
          onValueChange={setUsername}
          readOnly
        />

        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          type="text"
          value={password}
          onValueChange={setPassword}
          readOnly
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
}