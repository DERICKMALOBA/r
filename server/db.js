const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hello',
  password: 'm@lo2Ba3',
  port: 5432,
});

const getTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

const addTask = async (task) => {
  const { description, start_date, start_time, priority_level, due_date, due_time, status } = task;
  const result = await pool.query(
    'INSERT INTO tasks (description, start_date, start_time, priority_level, due_date, due_time, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [description, start_date, start_time, priority_level, due_date, due_time, status]
  );
  return result.rows[0];
};

const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE task_id = $1', [id]);
};

const editTask = async (id, task) => {
  const { description, start_date, start_time, priority_level, due_date, due_time, status } = task;
  const result = await pool.query(
    'UPDATE tasks SET description = $1, start_date = $2, start_time = $3, priority_level = $4, due_date = $5, due_time = $6, status = $7 WHERE task_id = $8 RETURNING *',
    [description, start_date, start_time, priority_level, due_date, due_time, status, id]
  );
  return result.rows[0];
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  editTask,
};
