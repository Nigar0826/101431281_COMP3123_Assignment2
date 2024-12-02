import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewEmployeeModal = ({ show, handleClose, employee }) => {
  if (!employee) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.entries(employee).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEmployeeModal;
