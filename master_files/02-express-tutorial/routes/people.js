// this is where we begin to handle the routes
const express = require('express');

// this gets our router
const router = express.Router();

// this gets you the data from your file
let { people } = require('../data');


// this sets the request property of the response to true and the data to the people you required in
router.get('/', (req,res)=>{
    res.status(200).json({success:true,data:people})
})

router.post('/', (req, res)=>{

    const {name} = req.body;

    if (!name) {
        return res.status(400).json({success:false,msg:'please provide name value'});
    }

    return res.status(201).json({success:true, person: name});


})



// this is adding things to our array actually
router.post('/postman', (req,res)=>{
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({success:false,msg:'please provide name value'});
    }

    return res.status(201).json({success:true, data: [...people, name]});
})

// put - this is for updating data
// if you have a list, the convention for editing or deleting is using route parameters with the colon
// essentially in this youre filtering out data to one thing then using the data in the body of the request to filter things out
router.put('/:id', (req, res)=>{

    // there are two sides for this request, there is the id coming in the route params and also the update data in the body
    const {id} = req.params;

    // this is getting the things from the body of the put request
    const {name} = req.body;

    // this is finding if the person is in the data by id
    // callback is the condition youre using to find things in the list and find just iterates
    const person = people.find((person)=> person.id === Number(id));

    if (!person) {
        return res.status(404).json({success:false, msg:`no person with id ${id}`});
    }

    // this is essentially iterating over each person and checking if the id matches, then it'll update the name with the body contents from the put request
    const newPeople = people.map((person)=>{
        if(person.id === Number(id)) {
            person.name = name;
        }
        return person
    })

    res.status(200).json({success: true, data:newPeople})
    
    
})

// delete
// convention is to have a list url and then a route param id, were not expecting anything in the body, just hit the api node and delete
router.delete('/:id', (req, res)=>{
    const {id} = req.params;

    const person = people.find((person)=> person.id === Number(id));

    if (!person) {
        return res.status(404).json({success:false, msg:`no person with id ${id}`});
    }

    // this filters out the person with the id that matches and returns everyone in a new array who doesn't match the id!   
    const newPeople = people.filter((person)=> person.id !== Number(id));

    return res.status(200).json({success: true, data:newPeople});
})

module.exports = router

