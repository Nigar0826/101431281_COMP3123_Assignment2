const express = require('express');
const { check, validationResult, param } = require('express-validator');
const Employee = require('../models/employeeModel');
const router = express.Router();


// GET /api/v1/employees/search - Search employees by department or position
router.get('/search', async (req, res) => {
  try {
    const { department, position } = req.query; // Extract query parameters
    const query = {};

    // Add department and position to the query object if provided
    if (department) query.department = department;
    if (position) query.position = position;

    console.log('Search query:', query); // Debugging log

    // Find employees matching the query
    const employees = await Employee.find(query);

    // Return employees in JSON format
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err.message); // Log errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// POST /api/v1/employees - Create a new employee
router.post('/', [
  check('first_name', 'First Name is required').notEmpty(),
  check('last_name', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('position', 'Position is required').notEmpty(),
  check('salary', 'Salary must be a number').isNumeric(),
  check('date_of_joining', 'Date of joining is required').notEmpty(),
  check('department', 'Department is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

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
    const newEmployee = await employee.save();
    res.status(201).json({
      message: 'Employee created successfully',
      employee_id: newEmployee._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET /api/v1/employees - Retrieve all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/v1/employees/:eid - Retrieve an employee by ID
router.get('/:eid', [
  param('eid', 'Invalid employee ID').isMongoId()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PUT /api/v1/employees/:eid - Update an employee by ID
router.put('/:eid', [
  param('eid', 'Invalid employee ID').isMongoId(),
  check('first_name', 'First Name is required').optional().notEmpty(),
  check('last_name', 'Last Name is required').optional().notEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('position', 'Position is required').optional().notEmpty(),
  check('salary', 'Salary must be a number').optional().isNumeric(),
  check('date_of_joining', 'Date of joining is required').optional().notEmpty(),
  check('department', 'Department is required').optional().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({
      message: 'Employee updated successfully',
      updatedEmployee,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE /api/v1/employees/:eid - Delete an employee by ID
router.delete('/:eid', [
  param('eid', 'Invalid employee ID').isMongoId()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.eid);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({
      message: 'Employee deleted successfully',
      employee_id: deletedEmployee._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/v1/employees/search - Search employees by department or position
router.get('/search', async (req, res) => {
  try {
    const { department, position } = req.query; // Extract query parameters
    const query = {};

    // Add department and position to the query object if provided
    if (department) query.department = department;
    if (position) query.position = position;

    console.log('Search query:', query); // Debugging log

    // Find employees matching the query
    const employees = await Employee.find(query);

    // Return employees in JSON format
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err.message); // Log errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
