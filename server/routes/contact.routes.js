const Router = require('express');
const ContactController = require('../controller/contact.controller');
const router = new Router()

router.post('/contacts', ContactController.createContacts)
router.get('/contacts', ContactController.getContacts)
router.get('/contacts/:id', ContactController.getOneContact)
router.put('/contacts/:id', ContactController.updateContacts)
router.delete('/contacts/:id', ContactController.deleteContacts)


module.exports = router