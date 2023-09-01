import express from 'express';
import bodyParser from 'body-parser';
import TodoRoute from './routes/TodoRoute';
import GenerateTokenRoute from './routes/GenerateTokenRoute';  // Import your generate token route
import JWTAuthorization from './auth/JWTAuthorization';
import Database from './db/Database';
import { Todo } from './models/Todo';

// Initialize database client and connect to the database
const dbClient = new Database('todo_app', 'root', '', 'localhost', 'mysql');
const sequelize = dbClient.getSequelize();

// Initialize Todo model
Todo.initialize(sequelize);

// Connect to the database
dbClient.connect();

// Initialize Express App
const app = express();
const port = 4000;

// Middlewares
app.use(bodyParser.json());

// Authorization instance
const jwtAuthorization = new JWTAuthorization('todo-api', '2h');

// Initialize Todo Routes
const todoRoute = new TodoRoute(jwtAuthorization);
const generateTokenRoute = new GenerateTokenRoute(jwtAuthorization);
app.use('/todo', todoRoute.router);

// Initialize Generate Token Route
app.use('/generate', generateTokenRoute.route());  // Add this line

// Listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; // for testing purposes
