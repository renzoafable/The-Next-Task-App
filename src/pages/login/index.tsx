import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import { useLogin } from 'src/hooks/useAuthApi';

const title = 'Login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, execute, isLoading } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      router.push('/');
    }
  }, [data, isLoading]);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await execute({ email, password });

    setEmail('');
    setPassword('');
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
          <div className="d-flex">
            <div className="flex-grow-1" />
            <Button variant="info text-white" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
