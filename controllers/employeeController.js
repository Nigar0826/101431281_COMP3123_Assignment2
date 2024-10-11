// Import Employee model and validationResult
const Employee = require('../models/employeeModel');
const { validationResult } = require('express-validator');

// Controller to get all employees from db
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
};

// Controller to get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' }); 
    }
    res.json(employee); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee', error: err.message });
  }
};

// Controller to create a new employee
const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }

  // Employee details from the request body
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  // Create a new Employee object
  const employee = new Employee({
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
  });

  try {
    // Save the employee to db
    const newEmployee = await employee.save();
    res.status(201).json({
      message: 'Employee created successfully',
      employee_id: newEmployee._id,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error creating employee', error: err.message });
  }
};

// Controller to update an existing employee by ID
const updateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the employee by ID and update the details
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.eid,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({
      message: 'Employee updated successfully',
      updatedEmployee,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error updating employee', error: err.message });
  }
};

// Controller to delete an employee from db by ID
const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.query.eid;

    // Find the employee by ID and delete
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({
      message: 'Employee deleted successfully',
      employee_id: deletedEmployee._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};