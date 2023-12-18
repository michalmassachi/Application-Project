"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student_model"));
const student_post_model_1 = __importDefault(require("../models/student_post_model"));
class BaseConstroller {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAll");
            try {
                if (req.query.name) {
                    const students = yield this.model.find({ name: req.query.name });
                    res.send(students);
                }
                else {
                    const students = yield this.model.find();
                    res.send(students);
                }
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getById:" + req.params.id);
            try {
                const student = yield this.model.findById(req.params.id);
                res.send(student);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("post:" + req.body);
            try {
                yield this.model.create(req.body);
                res.status(201).send("OK");
            }
            catch (err) {
                console.log(err);
                res.status(406).send("fail: " + err.message);
            }
        });
    }
    // putById(req: Request, res: Response) {
    //     res.send("put student by id: " + req.params.id);
    // }
    // deleteById(req: Request, res: Response) {
    //     res.send("delete student by id: " + req.params.id);
    // }
    putById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                // Check if the request is related to a student or a post student
                if (req.path.includes('student')) {
                    const existingStudent = yield student_model_1.default.findById(req.params.id);
                    existingStudent.name = data.name || existingStudent.name;
                    yield existingStudent.save();
                    res.json({ message: "Student updated successfully" });
                }
                if (req.path.includes('poststudent')) {
                    const existingStudent = yield student_post_model_1.default.findById(req.params.id);
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
                    yield existingStudent.save();
                    res.json({ message: "StudentPost updated successfully" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: `Error updating resource: ${error.message}` });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the student exists
                const existingStudent = yield this.model.findById(req.params.id);
                if (!existingStudent) {
                    return res.status(404).send("not found");
                }
                // Delete the student
                yield existingStudent.deleteOne();
                res.send("deleted successfully");
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
}
const createController = (model) => {
    return new BaseConstroller(model);
};
exports.default = createController;
//# sourceMappingURL=base_controller.js.map