import StudentPostModel, { IStudentPost } from "../models/student_post_model";
import createController from "./base_controller";


const studentPostController = createController<IStudentPost>(StudentPostModel);

// class StudentController extends BaseController<IStudent> {
//   constructor() {
//     super(StudentModel);
//   }
// }


export default studentPostController
