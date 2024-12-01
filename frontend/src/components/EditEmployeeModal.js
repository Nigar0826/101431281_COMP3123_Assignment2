import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { updateEmployee } from '../services/apiMethods';

const EditEmployeeModal = ({ show, handleClose, employee, refreshEmployeeList }) => {
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

  // Populate formData with employee data when the modal is opened
  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        position: employee.position || '',
        salary: employee.salary || '',
        date_of_joining: employee.date_of_joining ? employee.date_of_joining.split('T')[0] : '', // Format date
        department: employee.department || '',
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call API to update the employee
    updateEmployee(employee._id, formData)
      .then(() => {
        setSuccess('Employee updated successfully!');
        setError('');
        refreshEmployeeList(); // Refresh the employee list
        setTimeout(() => {
          setSuccess('');
          handleClose(); // Close the modal
        }, 2000);
      })
      .catch((err) => {
        setError('Failed to update employee. Please try again.');
        console.error('Error updating employee:', err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEmployeeModal;
