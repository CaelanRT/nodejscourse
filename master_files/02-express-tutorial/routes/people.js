// this is where we begin to handle the routes
const express = require('express');

// this gets our router
const router = express.Router();

// this gets you the data from your file
let { people } = require('../data');
const {getPeople, createPerson, createPersonPostman, updatePerson, deletePerson} = require('../controllers/people')

// your routes file is now way cleaner
// this calls your controller functions and you get all the things that they do
// 2 route setup flavours
// router.get('/', getPeople);
// router.post('/', createPerson);
// router.post('/postman', createPersonPostman);
// router.put('/:id', updatePerson);
// router.delete('/:id', deletePerson);

// you can chain all of your routes together if you want - same functionality as above but this is so clean honestly
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router

