import React, { useState } from 'react';
import { login } from '../services/apiMethods';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      if (response.message === 'Login successful') {
        setSuccess('Login successful! Redirecting...');
        setError(null);

        setTimeout(() => {
          window.location.href = '/dashboard'; 
        }, 2000);
      } else {
        throw new Error('Invalid login credentials.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Login failed: ' + (error.message || 'Invalid credentials.'));
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
