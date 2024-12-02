import React, { useEffect, useState } from "react";
import {
  getEmployees,
  searchEmployee,
} from "../services/apiMethods";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import { Button, Form, Table } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);

  // State for Search
  const [searchQuery, setSearchQuery] = useState({
    department: "",
    position: "",
  });

  const refreshEmployeeList = () => {
    setLoading(true);
    getEmployees()
      .then((response) => {
        if (Array.isArray(response)) {
          setEmployees(response);
        } else {
          console.error("Unexpected response format:", response);
          setEmployees([]); 
        }
      })
      .catch((err) => {
        console.error("Error fetching employees:", err.message);
        setError("Failed to load employees");
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    searchEmployee(searchQuery)
      .then((response) => {
        if (Array.isArray(response)) {
          setEmployees(response);
        } else {
          console.error("Unexpected search response format:", response);
          setEmployees([]);
        }
      })
      .catch((err) => {
        console.error("Error searching employees:", err.message);
        setError("Failed to search employees");
      })
      .finally(() => setLoading(false));
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleDeleteClick = (employeeId) => {
    setEmployeeIdToDelete(employeeId);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  if (loading) return <p>Loading employees...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="my-3">Employee List</h2>

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={searchQuery.department}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, department: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            value={searchQuery.position}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, position: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>{" "}
        <Button variant="secondary" onClick={refreshEmployeeList}>
          Reset
        </Button>
      </Form>

      <Button
        variant="success"
        onClick={() => setShowAddModal(true)}
        className="mb-3"
      >
        Add Employee
      </Button>

      <AddEmployeeModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshEmployeeList={refreshEmployeeList}
      />
      <EditEmployeeModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        employee={selectedEmployee}
        refreshEmployeeList={refreshEmployeeList}
      />
      <ViewEmployeeModal
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        employee={selectedEmployee}
      />
      <DeleteEmployeeModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        employeeId={employeeIdToDelete}
        refreshEmployeeList={refreshEmployeeList}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewClick(employee)}
                >
                  View
                </Button>{" "}
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
