import React, { useState } from 'react';
import { signup } from '../services/apiMethods';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    console.log('Signup Payload:', userData);

    try {
      const response = await signup(userData);
      setSuccess(response.message || 'Signup successful! Please log in.');
      setError('');
      setTimeout(() => navigate('/login'), 10000); 
    } catch (err) {
      console.error('Signup Error:', err.message);
      setError(err.message || 'Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
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
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
