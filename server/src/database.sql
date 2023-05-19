create TABLE contacts(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    countMessage INTEGER,
    status BOOLEAN,
    img VARCHAR,
    messege VARCHAR
);

-- psql -U postgres - login password
-- psql \! chcp 1251 - russian
-- \dt 
-- select * from contacts; 
-- pg