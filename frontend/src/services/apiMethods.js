import api from './api';

// User APIs
export const signup = (userData) => api.post('/signup', userData);
export const login = (credentials) => api.post('/login', credentials);

// Employee APIs
export const createEmployee = (employeeData) => api.post('/employees', employeeData);
export const getEmployees = () => api.get('/employees');
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const addEmployee = (employeeData) => api.post('/employees', employeeData); // Create Employee
export const updateEmployee = (id, employeeData) => api.put(`/employees/${id}`, employeeData);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
export const searchEmployee = (query) => api.get(`/employees/search`, { params: query });
