import express from 'express';
import todoRoutes from './routes/todo';
import generateToken from './routes/generateToken';
import './db/database';

const app = express();
const port = 4000;

app.use(express.json());
app.use('/todo', todoRoutes);
app.use('/generate', generateToken);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;  // for testing
