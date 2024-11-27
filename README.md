## Student Name: Nigar Ahmadova
## Student ID: 101431281
## COMP3123 Assignment 1

## Project Overview
This is a RESTful API for managing user accounts and employee records. The application allows users to sign up, log in, and perform CRUD operations on employee data.

## Technologies Used
- Node.js: Backend runtime environment.
- Express.js: Web framework for building the API.
- MongoDB: NoSQL database used for storing user and employee data.
- Mongoose: Object Data Modeling library forschema-based object modeling.
- Express-validator: Library for validating API requests.
- Postman: Used for testing API requests and responses.

## User Management
1. POST `/api/v1/user/signup`: Creates a new user account.
2. POST `/api/v1/user/login`: Authenticates a user and logs them in.

## Employee Management
1. GET `/api/v1/emp/employees`: Retrieves all employee records.
2. POST `/api/v1/emp/employees`: Creates a new employee.
3. GET `/api/v1/emp/employees/{eid}`: Retrieves an employee by ID.
4. PUT `/api/v1/emp/employees/{eid}`: Updates an employee’s information.
5. DELETE `/api/v1/emp/employees?eid=xxx`: Deletes an employee by ID.

## Instructions to Run the Project
1. Clone the repository: 
git clone https://github.com/Nigar0826/101431281_COMP3123_Assignment1.git
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Access the API at: `http://localhost:3000`

## Sample User for Testing

- Username: `newuser`
- Email: `newuser@example.com`
- Password: `password`

## How to Test the Login Functionality

1. **Signup:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/v1/user/signup`
   - Body (raw JSON):
     ```json
     {
       "username": "newuser",
       "email": "newuser@example.com",
       "password": "password"
     }
     ```

2. **Login:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/v1/user/login`
   - Body (raw JSON):
     ```json
     {
       "email": "newuser@example.com",
       "password": "password"
     }
     ```

## API Endpoints:
- Create User: `/api/v1/user/signup`
- Login: `/api/v1/user/login`
- Get Users: `/api/v1/user/users`


## MongoDB Setup
- The database is hosted on MongoDB Atlas.
- Database Name: comp3123_assignment1
- Collections: users, employees

## Hosting
- The application is deployed on Render at the following URL:
https://one01431281-comp3123-assignment1.onrender.com

## No JWT authentication is implemented (optional feature).

## Submission:
- Project ZIP File - 101431281_COMP3123_Assignment1
- Screenshots File - Assignment1_screenshots_Nigar
- Exported Postman Testing Collection - COMP3123 Assignment API.postman_collection
- GitHub Assignment Repo Link - https://github.com/Nigar0826/101431281_COMP3123_Assignment1
- Render Hosting URL - https://one01431281-comp3123-assignment1.onrender.com 

