const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper ( async (req, res) =>{
    
        const tasks = await Task.find({});

        // this is the way to show how many hits you got from the database and pass it back to the frontend, can also set up a status for if it was success and fail in the error
        res.status(200).json({ tasks, amount:tasks.length });
    
});

const createTask = asyncWrapper (async (req, res) => {
    
        const task = await Task.create(req.body);
        res.status(201).json({task});
    
});

const getTask = asyncWrapper (async (req, res, next) => {
    
    
        const {id:taskId} = req.params;
        const task = await Task.findOne({_id:taskId}).exec();

        if (!task) {
            return next(createCustomError(`No task with id : ${taskId}`, 404));
        }

        res.status(200).json({task});
        // res.status(200).send() - can send this as well
    
});

const updateTask = asyncWrapper (async (req, res) =>{
    
        const {id:taskId} = req.params;

        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new:true,
            runValidators:true
        });

        if (!task) {
            return next(createCustomError(`No task with id : ${taskId}`, 404));

        }
        
        res.status(200).json({task})
    
})

const deleteTask = asyncWrapper ( async (req, res) =>{
    
        const {id:taskId} = req.params;
        const task = await Task.findOneAndDelete({_id:taskId}).exec();

        if (!task) {
            return next(createCustomError(`No task with id : ${taskId}`, 404));

        }

        res.status(200).json({task});
    
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}