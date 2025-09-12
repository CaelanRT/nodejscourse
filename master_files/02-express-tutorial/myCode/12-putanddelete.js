const express = require('express');
const app = express();
let {people} = require('./data');

// static assets
app.use(express.static('./methods-public'))

// you can't just send a post request, you need to encode the URL with middleware by parsing the form data
// parse form data
app.use(express.urlencoded({extended:false}));

// parse json data
app.use(express.json())

// post
// this is your login page, and in the html if you hosted your server different from where your front end was hosted you would give the full path tot he front end form
app.post('/login', (req, res)=>{
    const {name} = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    } else {
        return res.status(401).send('Please Provide Credentials')
    }
})

// this sets the request property of the response to true and the data to the people you required in
app.get('/api/people', (req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post('/api/people', (req, res)=>{

    const {name} = req.body;

    if (!name) {
        return res.status(400).json({success:false,msg:'please provide name value'});
    }

    return res.status(201).json({success:true, person: name});


})



// this is adding things to our array actually
app.post('/api/postman/people', (req,res)=>{
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({success:false,msg:'please provide name value'});
    }

    return res.status(201).json({success:true, data: [...people, name]});
})

// put - this is for updating data
// if you have a list, the convention for editing or deleting is using route parameters with the colon
// essentially in this youre filtering out data to one thing then using the data in the body of the request to filter things out
app.put('/api/people/:id', (req, res)=>{

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
app.delete('/api/people/:id', (req, res)=>{
    const {id} = req.params;

    const person = people.find((person)=> person.id === Number(id));

    if (!person) {
        return res.status(404).json({success:false, msg:`no person with id ${id}`});
    }

    // this filters out the person with the id that matches and returns everyone in a new array who doesn't match the id!   
    const newPeople = people.filter((person)=> person.id !== Number(id));

    return res.status(200).json({success: true, data:newPeople});
})

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
})