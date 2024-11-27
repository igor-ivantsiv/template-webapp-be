import { Router, Request, Response, } from 'express';
import { default as mongoose } from "mongoose";
import Todo from "../models/todo.model";

const todosRoutes = Router();

// Get all todos

todosRoutes.get("/:userId",
    async (req: Request, res: Response, next) => {
        console.log(req.body)
        const userId = req.params.userId
        try {
            const todosData = await Todo.find({userId: userId})
            res.json(todosData);
        } catch (error) {
            next(error);
        }
    });

// Create a todo

todosRoutes.post("/",
    async (req: Request, res: Response, next) => {
        console.log(req.body)
        const {
            todo,
            userId,
        } = req.body;
        try {
            const todoData = await Todo.create({
                todo: todo,
                userId: userId
            })
            res.json(todoData);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

// Update todo

todosRoutes.put("/:_id", async (req: Request, res: Response, next) => {
    const { completed } = req.body;
    console.log(req.body)
    try {
        if (!mongoose.isValidObjectId(req.params._id)) {
            res.status(500).json("Invalid Id");
        } else {
            const updatedTodo = await Todo.findByIdAndUpdate(
                req.params._id,
                { $set: { completed: completed } },
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.status(200).json(updatedTodo);
        }
    } catch (error) {
        next(error);
    }
})

// Delete a todo

todosRoutes.delete("/:_id", async (req: Request, res: Response, next) => {
    console.log(req.body)
    try {
        if (!mongoose.isValidObjectId(req.params._id)) {
            res.status(500).json("Invalid Id");
        } else {
            await Todo.findByIdAndDelete(req.params._id);
            res.status(200).json("Todo deleted")
        }
    } catch (error) {
        next(error);
    }
});

export default todosRoutes
