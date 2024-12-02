import axios from 'axios';

// User-related APIs
const userApi = axios.create({
  baseURL: 'http://localhost:5000/api/v1/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee-related APIs
const employeeApi = axios.create({
  baseURL: 'http://localhost:5000/api/v1/employees',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const signup = async (userData) => {
  try {
    console.log('Sending Signup Request:', userData);
    const response = await userApi.post('/signup', userData);
    console.log('Signup Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
  }
};

export const login = async (credentials) => {
    try {
      console.log('Sending Login Request:', credentials);
      const response = await userApi.post('/login', credentials);
      console.log('Login Response:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Login API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  
  

// Employee APIs
export const createEmployee = async (employeeData) => {
  try {
    console.log('Creating Employee:', employeeData);
    const response = await employeeApi.post('/', employeeData);
    console.log('Create Employee Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create Employee API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create employee.');
  }
};

export const getEmployees = async () => {
    try {
      const response = await employeeApi.get("/");
      return response.data; 
    } catch (error) {
      console.error(
        "Get Employees API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch employees.");
    }
  };
  

export const getEmployeeById = async (id) => {
  try {
    console.log(`Fetching Employee with ID: ${id}`);
    const response = await employeeApi.get(`/${id}`);
    console.log('Get Employee Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Employee API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch employee.');
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    console.log(`Updating Employee with ID: ${id}`, employeeData);
    const response = await employeeApi.put(`/${id}`, employeeData);
    console.log('Update Employee Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update Employee API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update employee.');
  }
};

export const deleteEmployee = async (id) => {
  try {
    console.log(`Deleting Employee with ID: ${id}`);
    const response = await employeeApi.delete(`/${id}`);
    console.log('Delete Employee Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete Employee API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete employee.');
  }
};

export const searchEmployee = async (query) => {
  try {
    console.log('Searching Employees with Query:', query);
    const response = await employeeApi.get('/search', { params: query });
    console.log('Search Employee Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Search Employee API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to search employee.');
  }
};

export default {
  signup,
  login,
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
};
