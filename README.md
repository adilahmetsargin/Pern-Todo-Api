---

# Simple Todo App RESTful API

This is a simple Todo application backend built using Next.js, Node.js, Express.js, and PostgreSQL.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adilahmetsargin/Pern-Todo-Api.git
   ```

2. **Install dependencies:**

   ```bash
   cd Pern-Todo-Api
   npm install
   ```

3. **Set up the PostgreSQL database:**

   - Create a PostgreSQL database.
   - Update the database connection configuration in `config/db.config.js`.

4. **Run the server:**

   ```bash
   npm start
   ```

   The server will start running at `http://localhost:3000`.

## API Endpoints

- `GET /todos`: Get all todos.
- `GET /todos/:id`: Get todo by ID.
- `POST /todos`: Create a new todo.
- `PUT /todos/:id`: Update a todo.
- `DELETE /todos/:id`: Delete a todo.

For detailed usage examples, please refer to the [API documentation](docs/API.md).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have any suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
