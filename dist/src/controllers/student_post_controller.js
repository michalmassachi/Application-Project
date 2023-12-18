"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_post_model_1 = __importDefault(require("../models/student_post_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const studentPostController = (0, base_controller_1.default)(student_post_model_1.default);
// class StudentController extends BaseController<IStudent> {
//   constructor() {
//     super(StudentModel);
//   }
// }
exports.default = studentPostController;
//# sourceMappingURL=student_post_controller.js.map