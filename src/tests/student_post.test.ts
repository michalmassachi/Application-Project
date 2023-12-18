import { Express } from "express";
import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import StudentPost from "../models/student_post_model";

let app: Express;
beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
   await StudentPost.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

interface IStudentPost {
  title: string;
  message: string;
  owner: string;
  _id: string;
}

const post1: IStudentPost = {
  title: "title1",
  message: "message1",
  owner: "1234567890",
  _id: "1234567890",
};

describe("Student post tests", () => {
  const addStudentPost = async (post: IStudentPost) => {
    const response = await request(app).post("/studentpost").send(post);
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("OK");
  };

  test("Test Get All Student posts - empty response", async () => {
    const response = await request(app).get("/studentpost");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Post Student post", async () => {
    addStudentPost(post1);
  });

  test("Test Get All Students posts with one post in DB", async () => {
    const response = await request(app).get("/studentpost");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const rc = response.body[0];
    expect(rc.title).toBe(post1.title);
    expect(rc.message).toBe(post1.message);
    expect(rc.owner).toBe(post1.owner);
  });


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
  

  test("Test DELETE /studentpost/:id", async () => {
    const response = await request(app).delete(`/studentpost/${post1._id}`);
    expect(response.statusCode).toBe(200);
  });
  
});
