import { Router, Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { IAuthorization } from '../interfaces/interface'

export default class TodoRoute {
  public router: Router;

  constructor(private auth: IAuthorization) {
    this.router = Router();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.router.use((req, res, next) => {
      if (this.auth.authorize(req)) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    });
  }

  private initializeRoutes() {
    this.router.post('/', this.createTodo.bind(this));
    this.router.get('/', this.getAllTodos.bind(this));
    this.router.get('/:id', this.getSingleTodo.bind(this));
    this.router.put('/:id', this.updateTodo.bind(this));
    this.router.delete('/:id', this.deleteTodo.bind(this));
  }

  private async createTodo(req: Request, res: Response) {
    const todo = await Todo.create({
      title: req.body.title,
      done: req.body.done || false
    });
    res.json(todo);
  }

  private async getAllTodos(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const todos = await Todo.findAll({ limit, offset });
    res.json(todos);
  }

  private async getSingleTodo(req: Request, res: Response) {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }

  private async updateTodo(req: Request, res: Response) {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      todo.title = req.body.title || todo.title;
      todo.done = req.body.done !== undefined ? req.body.done : todo.done;

      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }

  private async deleteTodo(req: Request, res: Response) {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }
}
