import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 7777;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

// Check required environment variables
const requiredEnvVariables = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
const missingEnvVariables = requiredEnvVariables.filter(variable => !process.env[variable]);

if (missingEnvVariables.length > 0) {
  console.error(`Missing environment variables: ${missingEnvVariables.join(', ')}`);
  process.exit(1);
}

// Routes

// GET /todos
app.get('/todos', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST /todos
app.post('/todos', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description } = req.body;
    const result = await pool.query('INSERT INTO todos (description) VALUES ($1) RETURNING *', [description]);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /todos/:id
app.put('/todos/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedTodo = await pool.query('UPDATE todos SET description = $1 WHERE id = $2 RETURNING *', [description, id]);
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});