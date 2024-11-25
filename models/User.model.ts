import { Schema, model } from "mongoose"

const userSchema = new Schema(
{
    username: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        unique: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
      },
      passwordHash: {
        type: String,
        required: [true, "password is required"],
        trim: true,
      },
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;
