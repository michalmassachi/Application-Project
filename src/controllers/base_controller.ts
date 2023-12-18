import { Request, Response } from "express";
import { Model } from "mongoose";
import Student from "../models/student_model";
import StudentPost from "../models/student_post_model";

class BaseConstroller<ModelType>{

    model: Model<ModelType>
    constructor(model: Model<ModelType>) {
        this.model = model;
    }


    async get(req: Request, res: Response) {
        console.log("getAll");
        try {
            if (req.query.name) {
                const students = await this.model.find({ name: req.query.name });
                res.send(students);
            } else {
                const students = await this.model.find();
                res.send(students);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        console.log("getById:" + req.params.id);
        try {
            const student = await this.model.findById(req.params.id);
            res.send(student);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async post(req: Request, res: Response) {
        console.log("post:" + req.body);
        try {
            await this.model.create(req.body);
            res.status(201).send("OK");
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    // putById(req: Request, res: Response) {
    //     res.send("put student by id: " + req.params.id);
    // }

    // deleteById(req: Request, res: Response) {
    //     res.send("delete student by id: " + req.params.id);
    // }

    async putById(req: Request, res: Response): Promise<void> {
        try {
            const data: {  name?: string; title?: string; message?: string; owner?: string } = req.body;
    
            // Check if the request is related to a student or a post student
            if (req.path.includes('student')) {
                const existingStudent = await Student.findById(req.params.id);
                existingStudent.name = data.name || existingStudent.name;
                await existingStudent.save();
                res.json({ message: "Student updated successfully" });
            }
    
            if (req.path.includes('poststudent')) {
                const existingStudent = await StudentPost.findById(req.params.id);
    
                // Update only the provided fields
                if (data.title !== undefined) {
                    existingStudent.title = data.title;
                }
    
                if (data.message !== undefined) {
                    existingStudent.message = data.message;
                }
    
                if (data.owner !== undefined) {
                    existingStudent.owner = data.owner;
                }
    
                await existingStudent.save();
                res.json({ message: "StudentPost updated successfully" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error updating resource: ${error.message}` });
        }
    }
    
      
    
      

    async deleteById(req: Request, res: Response) {
    
        try {
            // Check if the student exists
            const existingStudent = await this.model.findById(req.params.id);
            if (!existingStudent) {
                return res.status(404).send("not found");
            }
    
            // Delete the student
            await existingStudent.deleteOne();
    
            res.send("deleted successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
    
}

const createController = <ModelType>(model: Model<ModelType>) => {
    return new BaseConstroller<ModelType>(model);
}

export default createController;