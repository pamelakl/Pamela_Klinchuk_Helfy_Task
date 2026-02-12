import express from "express";

import { ok, created, badRequest, notFound } from "../middleware/response.middleware.js";
import { validateSchema } from "../middleware/task.model.js";
import { v4 as uuidv4 } from 'uuid';

const tasks = [];

const tasksRouter = express.Router();

tasksRouter.get('/api/tasks', (req, res, next) => {
    try{
        return ok(res, {tasks}, 'Retrieved tasks successfully');
    } catch(err){
        next(err);
    }
});

tasksRouter.post('/api/tasks', validateSchema, (req, res, next) => {
    try{
        const {title, description, priority} = req.body;
        const newTask = {
            id: uuidv4(),
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
            priority
        }
        tasks.push(newTask);
        return ok(res, {task: newTask}, "Task added successfully");
    } catch(err){
        next(err);
    }
});

tasksRouter.put('/api/tasks/:id', (req, res, next) => {
    try{
        const taskId = req.params.id;
        const updates = req.body;
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return notFound(res, "Task not found");
        }
        const updatedTask = {
            ...tasks[taskIndex],
            ...updates 
        };
        tasks[taskIndex] = updatedTask;
        return ok(res, { task: updatedTask }, 'Task updated successfully');
    }catch(err){
        next(err);
    }
});

tasksRouter.delete('/api/tasks/:id', (req, res, next) => {
    try{
        const taskId = req.params.id;
        const len = tasks.length;
        tasks = tasks.filter(t => t.id != taskId);
        if(len != tasks.length){
            return notFound(res, "Task not found");
        }
        return ok(res, {taskId}, "Task deleted successfully");
    }catch(err){
        next(err);
    }
});

tasksRouter.patch('/api/tasks/:id/toggle', (req, res, next) => {
    try{
        const taskId = req.params.id;
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if(taskIndex === -1){
            return notFound(res, "Task not found");
        }
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            completed: !tasks[taskIndex].completed
        }
        return ok(res, {task: tasks[taskIndex]}, 'Updated task successfully');
    }catch(err){
        next(err);
    }
})

export default tasksRouter;