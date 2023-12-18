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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_post_model_1 = __importDefault(require("../models/student_post_model"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield student_post_model_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const post1 = {
    title: "title1",
    message: "message1",
    owner: "1234567890",
    _id: "1234567890",
};
describe("Student post tests", () => {
    const addStudentPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/studentpost").send(post);
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe("OK");
    });
    test("Test Get All Student posts - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/studentpost");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post Student post", () => __awaiter(void 0, void 0, void 0, function* () {
        addStudentPost(post1);
    }));
    test("Test Get All Students posts with one post in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/studentpost");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const rc = response.body[0];
        expect(rc.title).toBe(post1.title);
        expect(rc.message).toBe(post1.message);
        expect(rc.owner).toBe(post1.owner);
    }));
    // test("Test PUT /studentpost/:id", async () => {
    //   const updatedPost = {
    //     title: "Updated Title",
    //     message: "Updated Message",
    //     owner: "1234567890",
    //     _id: "1234567890"
    //   };
    //   // Retrieve the ID of the added post
    //   const responseGet = await request(app).get("/studentpost");
    //   const postId = responseGet.body[0]._id;
    //   // Perform the update
    //   const responseUpdate = await request(app)
    //     .put(`/studentpost/${postId}`)
    //     .send(updatedPost);
    //   expect(responseUpdate.statusCode).toBe(200);
    //   // Verify that the post was updated successfully
    //   const responseGetUpdated = await request(app).get(`/studentpost/${postId}`);
    //   const updatedPostResponse = responseGetUpdated.body;
    //   expect(updatedPostResponse.title).toBe(updatedPost.title);
    //   expect(updatedPostResponse.message).toBe(updatedPost.message);
    //   expect(updatedPostResponse.owner).toBe(updatedPost.owner);
    //   expect(updatedPostResponse._id).toBe(updatedPost._id);
    // });
    test("Test DELETE /studentpost/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/studentpost/${post1._id}`);
        expect(response.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=student_post.test.js.map