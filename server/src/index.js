const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('Hello server how are you');
});

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.send(result.rows);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.get('/messages-contact/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM messages WHERE "senderId" = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});
app.get('/message-user/:id/:contactid', async (req, res) => {
  const { id, contactid } = req.params;
  try {
    const result = await db.query('SELECT * FROM messages WHERE ("senderId" = $1 AND "receiverId" = $2) OR ("senderId" = $2 AND "receiverId" = $1)', [id, contactid]);
    const filteredMessages = result.rows;
    res.json(filteredMessages);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.post('/create-messages', async (req, res) => {
  const { text, date, senderId, receiverId, emoji } = req.body;
  try {
    const result = await db.query('INSERT INTO messages (text, date, "senderId", "receiverId", emoji) VALUES ($1, $2, $3, $4, $5) RETURNING *', [text, date, senderId, receiverId, emoji]);
    res.send(result.rows);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});
app.get('/contacts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contacts');
    res.send(result.rows)
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.put('/edit-messages/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const result = await db.query('UPDATE messages SET text = $1 WHERE id = $2 RETURNING *', [text, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.delete('/delete-messages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM messages WHERE id = $1', [id]);
    res.json({ message: 'Сообщение успешно удалено' });
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.post('/create-user', async (req, res) => {
  const { login, password, firstName, lastName, countMessage, status, phone, email, img, messege } = req.body;
  try {
    const result = await db.query('INSERT INTO users (login, password, "firstName", "lastName", "countMessage", status, phone, email, img, messege) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [login, password, firstName, lastName, countMessage, status, phone, email, img, messege]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password]);
    if (result.rows.length > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
