import mongoose, { Schema, model } from "mongoose"

const todoSchema = new Schema(
    {
        todo: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

const Todo = model("Todo", todoSchema);

export default Todo;
