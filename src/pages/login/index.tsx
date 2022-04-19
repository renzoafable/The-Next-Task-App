import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Link from 'next/link';

import SpinnerButton from 'src/components/SpinnerButton';
import SkeletonLoader from 'src/components/SkeletonLoader';
import useSession from 'src/hooks/useSession';
import { useLogin } from 'src/hooks/useAuthApi';

const title = 'Login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { execute, isLoading } = useLogin({ redirectTo: '/incomplete' });
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = session.isAuthenticated();

    if (isAuthenticated) {
      router.push('/');
    } else {
      setShowForm(true);
    }
  }, []);

  useEffect(() => {
    router.prefetch('/incomplete');
  }, []);

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

  const content = showForm ? (
    <>
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
          <SpinnerButton
            variant="info"
            isLoading={isLoading}
            className="text-white"
            type="submit"
          >
            Login
          </SpinnerButton>
        </div>
        <p className="text-white text-end mt-4 fs-6">
          No account yet?{' '}
          <Link href="/register">
            <a className="text-decoration-none text-info">Register</a>
          </Link>
        </p>
      </Form>
    </>
  ) : (
    <SkeletonLoader />
  );

  return (
    <div>
      <Head>{title}</Head>
      <Container
        fluid="sm"
        className="position-absolute top-50 start-50 translate-middle"
      >
        <Row>
          <Col xs={4} />
          <Col xs={4}>{content}</Col>
        </Row>
      </Container>
    </div>
  );
}
