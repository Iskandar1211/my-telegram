const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./data');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// app.use('/api', contactRouter)

app.get("/", (req, res) => {
  res.send('Hello server how are you')
})

// const contacts = [
//   {
//     id: uuid(),
//     firstName: 'Leanne',
//     lastName: 'Graham',
//     countMessage: 2,
//     status: true,
//     phone: "1-770-736-8031 x56442",
//     email: "Sincere@april.biz",
//     img: '1.jpg',
//     messege: "Hello Leanne how.."
//   },
//   {
//     id: uuid(),
//     firstName: 'Ervin ',
//     lastName: 'Howell',
//     countMessage: 5,
//     status: false,
//     phone: "010-692-6593 x09125",
//     email: "Shanna@melissa.tv",
//     img: '2.jpg',
//     messege: "how do you do"
//   },
//   {
//     id: uuid(),
//     firstName: 'Clementine ',
//     lastName: 'Bauch',
//     countMessage: 6,
//     status: true,
//     phone: "1-463-123-4447",
//     email: "Nathan@yesenia.net",
//     img: '3.jpg',
//     messege: "Чихели сози"
//   },
//   {
//     id: uuid(),
//     firstName: 'Patricia  ',
//     lastName: 'Lebsack',
//     countMessage: 8,
//     status: false,
//     phone: "493-170-9623 x156",
//     email: "Julianne.OConner@kory.org",
//     img: '4.jpg',
//     messege: "Как успехи"
//   },
//   {
//     id: uuid(),
//     firstName: 'Chelsey ',
//     lastName: 'Dietrich',
//     countMessage: 1,
//     status: true,
//     phone: "(254)954-1289",
//     email: "Lucio_Hettinger@annie.ca",
//     img: '5.jpg',
//     messege: "Что нового ?..."
//   },
//   {
//     id: uuid(),
//     firstName: 'Mrs. Dennis  ',
//     lastName: 'Schulist',
//     countMessage: 15,
//     status: false,
//     phone: "1-477-935-8478 x6430",
//     email: "Karley_Dach@jasper.info",
//     img: '6.jpg',
//     messege: "Чем занят"
//   },
//   {
//     id: uuid(),
//     firstName: 'Kurtis ',
//     lastName: 'Weissnat',
//     countMessage: 22,
//     status: true,
//     phone: "210.067.6132",
//     email: "Telly.Hoeger@billy.biz",
//     img: '7.jpg',
//     messege: "Как погода сегодня"
//   },
//   {
//     id: uuid(),
//     firstName: 'Nicholas ',
//     lastName: 'Runolfsdottir V',
//     countMessage: 4,
//     status: false,
//     phone: "586.493.6943 x140",
//     email: "Sherwood@rosamond.me",
//     img: '8.jpg',
//     messege: "Справился с домашкой?"
//   },
//   {
//     id: uuid(),
//     firstName: 'Clementine ',
//     lastName: 'Bauch',
//     countMessage: 7,
//     status: false,
//     phone: "(775)976-6794 x41206",
//     email: "Chaim_McDermott@dana.io",
//     img: '9.jpg',
//     messege: "Какие планы на сегодня"
//   },
//   {
//     id: uuid(),
//     firstName: 'Glenna ',
//     lastName: 'Reichert',
//     countMessage: 6,
//     status: true,
//     phone: "024-648-3804",
//     email: "Rey.Padberg@karina.biz",
//     img: '10.jpg',
//     messege: "JS или TS ?"
//   }
// ];

// localStorage.setItem('contacts',JSON.stringify(contacts))
// let messages = [];
// localStorage.setItem('messages',JSON.stringify(messages));

app.get("/users", (req, res) => {
  res.send(localStorage.getItem('users'))
})

app.get('/messeges', (req, res) => {
  res.send(localStorage.getItem('messages'))
})

app.get('/messages-contact/:id', (req, res) => {
  const { id } = req.params;
  const messages = localStorage.getItem('messages');
  const fiterMessages = JSON.parse(messages).filter(message => message.senderId === id)
  res.send(fiterMessages);
});

app.get('/message-user/:id/:contactid', (req, res) => {
  const { id, contactid } = req.params;
  const messages = localStorage.getItem('messages');
  const fiterMessages = JSON.parse(messages).filter((message) => (
    (message.senderId === contactid && message.receiverId === id)
    || (message.senderId === id && message.receiverId === contactid)
  ))
  res.send(fiterMessages)
});

app.post('/create-messages', (req, res) => {
  const messages = localStorage.getItem('messages');
  const messagesAdded = messages ? JSON.parse(messages) : [];
  messagesAdded.push(req.body);
  localStorage.setItem('messages', JSON.stringify(messagesAdded))
  res.send(messagesAdded);
});


app.put('/edit-messages/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let messages = localStorage.getItem('messages');
  messages = JSON.parse(messages);
  const updatedMessage = messages.find(message => message.id == id);
  updatedMessage.text = text;
  localStorage.setItem('messages', JSON.stringify(messages));
  res.json(updatedMessage);
});


app.delete('/delete-messages/:id', (req, res) => {
  const { id } = req.params;
  const messages = localStorage.getItem('messages');
  const deleteMesseges = JSON.parse(messages).filter(message => message.id !== id);
  localStorage.setItem('messages', JSON.stringify(deleteMesseges))
  res.json(messages);
});

app.post('/create-user', (req, res) => {
  const user = req.body;
  const users = JSON.parse(localStorage.getItem('users'))
  if (!user.login || !user.password) {
    return res.status(400).send('Логин и пароль являются обязательными полями.');
  }

  const existingUser = users.find(u => u.login === user.login);
  if (existingUser) {
    return res.status(409).send('Пользователь с таким логином уже существует.');
  }
  const newUser = [...users, user]
  localStorage.setItem('users', JSON.stringify(newUser));

  res.send(users);
});

app.post('/login', (req, res) => {
  const { login, password } = req.body;
  const users = JSON.parse(localStorage.getItem('users'))

  if (!login || !password) {
    return res.sendStatus(400);
  }

  const currentUser = users.find(user => user.login === login && user.password === password);

  if (currentUser) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});


app.listen(port, () => {
  console.log(port);
})