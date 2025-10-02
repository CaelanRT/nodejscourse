const mongoose = require('mongoose');


// this is where you're setting up your database schema so that it only allows additions with the structure of the documents that you want
const TaskSchema = new mongoose.Schema({
    // Schema validation - need to be able to not accept empty inputs
    name:{
        type:String,
        required:[true,'must provide a name'],
        trim:true,
        maxlength:[20, 'name cannot be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }
});

// once you have the schema, you want to set up the model (representation for the collection)
// once you have a model, all the tasks you add to the database then you are adding things to the collection
// the instance of the model is called a document, model is a wrapper for a schema
// .create() creates an instance of the model so the document and writes it to the database

module.exports = mongoose.model('Task', TaskSchema);
