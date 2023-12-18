import mongoose from "mongoose";

export interface IStudentPost {
    title: string;
    message: string;
    owner: string;
    _id: string
  }

const studentPostSchema = new mongoose.Schema<IStudentPost>({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
  },
});

export default mongoose.model<IStudentPost>("StudentPost", studentPostSchema);
