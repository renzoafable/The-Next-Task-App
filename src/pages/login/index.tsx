import Head from 'next/head';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const title = 'Login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassworld] = useState('');

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassworld(e.target.value);
  };

  return (
    <div>
      <Head>{title}</Head>
      <Container
        fluid="sm"
        className="w-50 position-absolute top-50 start-50 translate-middle"
      >
        <h1 className="display-6 text-white text-center mb-3 fw-bold">Login</h1>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-white">Email</Form.Label>
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
          <Button variant="info text-white" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}
