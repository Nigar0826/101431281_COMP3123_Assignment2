import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'; 
import { createEmployee } from '../services/apiMethods';

const AddEmployeeModal = ({ show, handleClose, refreshEmployeeList }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous alerts
    setError('');
    setSuccess('');

    // Send API request
    createEmployee(formData)
      .then(() => {
        setSuccess('Employee added successfully!');
        refreshEmployeeList(); 
        setTimeout(() => {
          setSuccess('');
          handleClose(); 
        }, 2000);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || 'Failed to add employee. Please try again.'
        );
        console.error('Error adding employee:', err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display success or error alerts */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {/* Form to add a new employee */}
        <Form onSubmit={handleSubmit}>
          {/* Dynamic form generation */}
          {[
            { field: 'first_name', type: 'text' },
            { field: 'last_name', type: 'text' },
            { field: 'email', type: 'email' },
            { field: 'position', type: 'text' },
            { field: 'salary', type: 'number' },
            { field: 'date_of_joining', type: 'date' },
            { field: 'department', type: 'text' },
          ].map(({ field, type }) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
              <Form.Control
                type={type}
                placeholder={`Enter ${field.replace('_', ' ')}`}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Add Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;
