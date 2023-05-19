const db = require('../src/db');

class ContactController {
    async createContacts(req, res) {
        try {
            const {  firstName, lastName, countMessage, status, img, messege } = req.body;
            const newContact = await db.query(`INSERT INTO contacts (firstName, lastName, countMessage, status, img, messege) 
            VALUES ($1, $2, $3, $4, $5, $6)`, [ firstName, lastName, countMessage, status, img, messege])
            res.send('Пользователь добавленно');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create contacts' });
        }
    }

    async getContacts(req, res) {
        const contacts = await db.query('SELECT * FROM contacts');
        res.json(contacts.rows);
    }

    async getOneContact(req, res) {
        // TODO: implement
    }

    async updateContacts(req, res) {
        // TODO: implement
    }

    async deleteContacts(req, res) {
        // TODO: implement
    }
}

module.exports = new ContactController();
