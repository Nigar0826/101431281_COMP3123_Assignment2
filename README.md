## Student Name: Nigar Ahmadova
## Student ID: 101431281
## COMP3123 Assignment 2

## Project Overview
This project combines a full-stack application with a ReactJS frontend and a Node.js/Express backend connected to MongoDB. The application supports user authentication and employee management with CRUD operations and search functionality.

This assignment leverages Docker for containerization instead of cloud deployment.

### Features Implemented:
  ## Backend:
    # User Authentication:
         - POST /api/v1/user/signup: Register a user with email and password.
         - POST /api/v1/user/login: Login and validate credentials.

    # Employee Management:
         - POST /api/v1/employees: Add a new employee.
         - GET /api/v1/employees: List all employees.
         - GET /api/v1/employees/:id: View employee details.
         - PUT /api/v1/employees/:id: Update employee information.
         - DELETE /api/v1/employees/:id: Delete an employee.
         - GET /api/v1/employees/search: Search employees by department or position.

    # MongoDB Integration:
         - MongoDB is used as the database, configured with mongoose.
         - Validation and error handling for inputs.

    # Dockerization:
         - Backend, frontend, and MongoDB are containerized using Docker.
         - Orchestrated with docker-compose.yml.


  ## Frontend:
    # Login and Signup:
         - Components with form validation.

    # Employee Management:
         - Employee List: Displays all employees in a table format.
         - Add Employee: Form for adding new employees with validations.
         - Edit Employee: Modal for updating employee information.
         - View Employee: Modal for viewing employee details.
         - Delete Employee: Deletes employee records.
         - Search Employees: Filters employees by department or position.

    # Routing and Navigation:
         - React Router is used for navigating between Login, Signup, and Employee screens.

    # Styling:
         - Bootstrap used for UI components.
         - Responsive design for all screens.


### Technologies Used
  ## Backend:
      - Node.js, Express.js, MongoDB, Mongoose
      - bcrypt (for password hashing)
      - express-validator (input validation)

  ## Frontend:
      - ReactJS, React-Bootstrap, React-Router-DOM, Axios

  ## Containerization:
      - Docker, Docker Compose


### API Endpoints:
  ## User Routes:
         - POST /api/v1/user/signup
         - POST /api/v1/user/login
  ## Employee Routes:
         - GET /api/v1/employees
         - POST /api/v1/employees
         - GET /api/v1/employees/:id
         - PUT /api/v1/employees/:id
         - DELETE /api/v1/employees/:id
         - GET /api/v1/employees/search


## Instructions to Run the Project
1. Clone the repository: 
git clone https://github.com/Nigar0826/101431281_COMP3123_Assignment2
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Access the services:
     - Frontend: http://localhost:3000
     - Backend API: http://localhost:5000


## Submission:
- Project ZIP File - 101431281_COMP3123_Assignment2
- Screenshots File - Assignment2_screenshots_Nigar
- GitHub Assignment Repo Link - https://github.com/Nigar0826/101431281_COMP3123_Assignment2


