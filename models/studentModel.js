import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    tId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the student name"],
    },
    email: {
      type: String,
      required: [true, "Please add the student email"],
    },
    phone: {
      type: String,
      required: [true, "Please add the student phone number"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);