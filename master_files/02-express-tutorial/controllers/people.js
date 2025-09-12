// this is where youre seeting up your controller functions
// essentially your business logic for the inside of your routes

let { people } = require('../data');

const getPeople = (req,res) =>{
    res.status(200).json({success:true, data:people})
}

const createPerson = (req, res)=>{

    const {name} = req.body;

    if (!name) {
        return res.status(400).json({success:false,msg:'please provide name value'});
    }

    return res.status(201).json({success:true, person: name});


}

const createPersonPostman = (req,res)=>{
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({success:false,msg:'please provide name value'});
    }

    return res.status(201).json({success:true, data: [...people, name]});
}

const updatePerson = (req, res)=>{

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
}

const deletePerson = (req, res)=>{
    const {id} = req.params;

    const person = people.find((person)=> person.id === Number(id));

    if (!person) {
        return res.status(404).json({success:false, msg:`no person with id ${id}`});
    }

    // this filters out the person with the id that matches and returns everyone in a new array who doesn't match the id!   
    const newPeople = people.filter((person)=> person.id !== Number(id));

    return res.status(200).json({success: true, data:newPeople});
}

module.exports = {
    getPeople, createPerson, createPersonPostman, updatePerson, deletePerson
}