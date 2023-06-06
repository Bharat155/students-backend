import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    username: {
        type: String,
        required:  [true, "Please add the username"],
    },
    email:{
        type: String,
        required: [true, "Please add the email"],
        unique: [true, "Email address already exists"],
    },
    password:{
        type: String,
        required: [true, "Please add the password"],
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Teacher", teacherSchema);