import { createFileRoute } from '@tanstack/react-router'
import React from "react";
import {Form, Input, Button} from "@heroui/react";

export const Route = createFileRoute('/create-new-user')({
  component: CreateNewUser,
})

// move this to an env file
// API_URL might change, we need to ask to the server through ip route
const API_URL = 'http://192.168.1.10:3000'
const CREATE_USER_URL = `${API_URL}/create-user`

function CreateNewUser() {
  // ts should be 7 digits, so I need to verify it, otherwise, add 0
  const passts = (Date.now() % 10000000).toString().padStart(7, '0')
  const userts = (((Date.now() % 100) * Date.now()) % 1000).toString().padStart(4, '0')
  const [username, setUsername] = React.useState(`user_${userts}`);
  const [password, setPassword] = React.useState(passts);
  const [submitted, setSubmitted] = React.useState(null);

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
    .then(resp => console.log(resp))
    .catch(err => console.error("Something went wrong", err))
  };

  


  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
      onReset={() => setSubmitted(null)}
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
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}