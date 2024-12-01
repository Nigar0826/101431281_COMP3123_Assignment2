import React, { useEffect, useState } from 'react';
import { getEmployees, searchEmployee } from '../services/apiMethods';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import ViewEmployeeModal from './ViewEmployeeModal';
import { Button, Form } from 'react-bootstrap';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // State for Search
  const [searchQuery, setSearchQuery] = useState({ department: '', position: '' });

  const refreshEmployeeList = () => {
    setLoading(true);
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  };

  // Search Functionality
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    searchEmployee(searchQuery)
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error searching employees:', error);
        setLoading(false);
      });
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2>Employee List</h2>

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={searchQuery.department}
            onChange={(e) => setSearchQuery({ ...searchQuery, department: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            value={searchQuery.position}
            onChange={(e) => setSearchQuery({ ...searchQuery, position: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>{' '}
        <Button variant="secondary" onClick={refreshEmployeeList}>
          Reset
        </Button>
      </Form>

      <Button variant="success" onClick={() => setShowAddModal(true)} className="mb-3">
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

      <table>
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
                <Button variant="info" onClick={() => handleViewClick(employee)}>
                  View
                </Button>{' '}
                <Button variant="warning" onClick={() => handleEditClick(employee)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
