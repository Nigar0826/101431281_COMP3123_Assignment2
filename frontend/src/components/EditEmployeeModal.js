import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { updateEmployee } from '../services/apiMethods';

const EditEmployeeModal = ({ show, handleClose, employee, refreshEmployeeList }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        position: employee.position || '',
        salary: employee.salary || '',
        date_of_joining: employee.date_of_joining?.split('T')[0] || '',
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
    updateEmployee(employee._id, formData)
      .then(() => {
        setSuccess('Employee updated successfully!');
        setError('');
        refreshEmployeeList();
        setTimeout(() => {
          setSuccess('');
          handleClose();
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
        {error ? <Alert variant="danger">{error}</Alert> : null}
        {success ? <Alert variant="success">{success}</Alert> : null}
        <Form onSubmit={handleSubmit}>
          {formData &&
            Object.keys(formData).map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
                <Form.Control
                  type={
                    field === 'salary' ? 'number' : field === 'date_of_joining' ? 'date' : 'text'
                  }
                  placeholder={`Enter ${field.replace('_', ' ')}`}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            ))}
          <Button variant="primary" type="submit">
            Update Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEmployeeModal;
