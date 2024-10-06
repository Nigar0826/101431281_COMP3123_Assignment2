const express = require('express');
const Employee = require('../models/employeeModel');
const router = express.Router();

// GET /api/v1/emp/employees - Get all employees
router.get('/api/v1/emp/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/v1/emp/employees/:eid - Get employee by ID
router.get('/api/v1/emp/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/v1/emp/employees - Create a new employee
router.post('/api/v1/emp/employees', async (req, res) => {
  
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  // Create a new Employee 
  const employee = new Employee({
    first_name: first_name,
    last_name: last_name,
    email: email,
    position: position,
    salary: salary,
    date_of_joining: date_of_joining,
    department: department
  });

  try {
    // Save the new employee to the database
    const newEmployee = await employee.save();
    res.status(201).json({
      message: 'Employee created successfully',
      employee_id: newEmployee._id
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/v1/emp/employees/:eid - Update employee by ID
router.put('/api/v1/emp/employees/:eid', async (req, res) => {
  try {
    // Find employee by ID and update with the new data
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({
      message: 'Employee updated successfully',
      updatedEmployee
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/v1/emp/employees?eid=xxx - Delete employee by ID
router.delete('/api/v1/emp/employees', async (req, res) => {
  try {
    const employeeId = req.query.eid;
    // Find employee by ID and delete from the database
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({
      message: 'Employee deleted successfully',
      employee_id: deletedEmployee._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;