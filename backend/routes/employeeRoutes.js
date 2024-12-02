const express = require('express');
const Employee = require('../models/employeeModel');
const router = express.Router();

// GET / - Fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error('Error Fetching Employees:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST / - Add a new employee
router.post('/', async (req, res) => {
  const { name, position, salary } = req.body;

  try {
    const newEmployee = new Employee({ name, position, salary });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error('Error Creating Employee:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
