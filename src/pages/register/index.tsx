import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Container, Form } from 'react-bootstrap';

import { useRegisterUser } from 'src/hooks/useAuthApi';

const title = 'Register User';

export default function Register(): JSX.Element {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { execute } = useRegisterUser({ redirectTo: '/' });

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await execute({ age: parseFloat(age), email, name, password });

    setName('');
    setAge('');
    setEmail('');
    setPassword('');
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Head>{title}</Head>
      <Container
        fluid="sm"
        className="w-50 position-absolute top-50 start-50 translate-middle"
      >
        <h1 className="display-6 text-white text-center mb-3 fw-bold">
          Register
        </h1>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              value={name}
              onChange={onChangeName}
              required
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label className="text-white">Age</Form.Label>
            <Form.Control
              value={age}
              onChange={onChangeAge}
              required
              type="number"
              placeholder="Enter age"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={onChangeEmail}
              required
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              value={password}
              onChange={onChangePassword}
              required
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-flex">
            <div className="flex-grow-1" />
            <Button variant="info text-white" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
