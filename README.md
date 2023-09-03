# TypeScript Todo API

## Description

This is a simple RESTful API built with TypeScript and Express that allows for CRUD operations on Todo items. It uses MySQL as its database and includes features like pagination and JWT authentication.

## Requirements

-   Node.js
-   TypeScript
-   MySQL

## Setup

1.  **Clone the repository**
`git clone https://github.com/taliffsss/todo-rest-api.git` 

2.  **Navigate to project directory**
`cd todo-rest-api` 
3.  **Install dependencies**
`npm install` 

5.  **Compile TypeScript to JavaScript**
`tsc` 
6.  **Run Database Migrations**
`npx sequelize-cli db:migrate` 

7.  **Start the server**
`npm run build && npm run dev` 
`npm run build && npm start`

## Endpoints
-   POST `/generate`: Generates a JWT token.
-   POST `/todo`: Create a new Todo item.
-   GET `/todo`: Get a paginated list of Todo items.
-   GET `/todo/:id`: Get a single Todo item by ID.
-   PUT `/todo/:id`: Update a Todo item by ID.
-   DELETE `/todo/:id`: Delete a Todo item by ID.

## Test

Run the test suite using:
`npm test` 

## Authorization
This API uses JWT for authorization. To generate a token, make a POST request to `/generate`.
Include this token in the `Authorization` header for the Todo routes.

ATM Diagram Design: https://showme.redstarplugin.com/d/d:1FXixVRG
