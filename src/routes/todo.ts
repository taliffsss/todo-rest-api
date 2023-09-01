import { Router } from 'express';
import { Todo } from '../models/Todo';
import { verifyToken, generateToken } from '../auth/auth';

const router = Router();

// Authorization middleware
router.use((req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if authHeader exists and starts with "Bearer "
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Take the second part of the split string
    const payload = verifyToken(token);
    if (payload) {
      next();
      return; // Exit the middleware successfully
    }
  }

  // If any condition fails, return Unauthorized
  res.status(401).json({ message: 'Unauthorized' });
});


// Create
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    done: req.body.done || false
  });
  res.json(todo);
});

// Read - Get All with Pagination
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  const todos = await Todo.findAll({ limit, offset });
  res.json(todos);
});

// Read - Get Single
router.get('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    todo.title = req.body.title || todo.title;
    todo.done = req.body.done !== undefined ? req.body.done : todo.done;

    await todo.save();
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete  
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

export default router;
