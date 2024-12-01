import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteEmployee } from "../services/apiMethods";

const DeleteEmployeeModal = ({ show, handleClose, employeeId, refreshEmployeeList }) => {
  const handleConfirmDelete = () => {
    deleteEmployee(employeeId)
      .then(() => {
        alert("Employee deleted successfully.");
        refreshEmployeeList();
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee. Please try again.");
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this employee? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployeeModal;
