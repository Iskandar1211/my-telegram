create TABLE
    contacts(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        countMessage INTEGER,
        status BOOLEAN,
        img VARCHAR(255),
        messege VARCHAR(255)
    );

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(50),
  password VARCHAR(50),
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  countMessage INTEGER,
  status BOOLEAN,
  phone VARCHAR(20),
  email VARCHAR(50),
  img VARCHAR(50),
  message TEXT
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  text TEXT,
  date VARCHAR(50),
  senderId INTEGER NOT NULL,
  receiverId INTEGER NOT NULL,
  emoji VARCHAR(20) | NULL
);

    
    -- psql -U postgres - login password
    -- psql \! chcp 1251 - russian
    -- \dt 
    -- select * from contacts; 
    -- pg
    -- \connect telegram