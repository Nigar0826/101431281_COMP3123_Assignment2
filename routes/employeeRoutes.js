const express = require('express');
const { check, validationResult } = require('express-validator');
const Employee = require('../models/employeeModel');
const router = express.Router();

// GET /api/v1/emp/employees - Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/v1/emp/employees/:eid - Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/v1/emp/employees - Create a new employee
router.post('/employees', [
  // Validation checks
  check('first_name', 'First Name is required').notEmpty(),
  check('last_name', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('position', 'Position is required').notEmpty(),
  check('salary', 'Salary must be a number').isNumeric(),
  check('date_of_joining', 'Date of joining is required').notEmpty(),
  check('department', 'Department is required').notEmpty()
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  // Create a new Employee
  const employee = new Employee({
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department
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
router.put('/employees/:eid', [
  // Validation checks for updates (use similar checks as for creating an employee)
  check('first_name', 'First Name is required').optional().notEmpty(),
  check('last_name', 'Last Name is required').optional().notEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('position', 'Position is required').optional().notEmpty(),
  check('salary', 'Salary must be a number').optional().isNumeric(),
  check('date_of_joining', 'Date of joining is required').optional().notEmpty(),
  check('department', 'Department is required').optional().notEmpty()
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
router.delete('/employees', async (req, res) => {
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