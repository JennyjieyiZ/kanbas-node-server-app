import db from "../Database/index.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
let { users } = db;

export default function UserRoutes(app) {
    const createCourse = (req, res) => {
      const currentUser = req.session["currentUser"];
      const newCourse = courseDao.createCourse(req.body);
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);
}

export const createUser = (user) => {
    const newUser = { ...user, _id: Date.now().toString() };
    users = [...users, newUser];
    return newUser;
   };
   export const findAllUsers = () => users;
   export const findUserById = (userId) => users.find((user) => user._id === userId);
   export const findUserByUsername = (username) => users.find((user) => user.username === username);
   export const findUserByCredentials = (username, password) =>
     users.find( (user) => user.username === username && user.password === password );
   export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
   export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
   
   
   