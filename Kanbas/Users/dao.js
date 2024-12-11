import model from "./model.js";
import db from "../Database/index.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
let { users } = db;


export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

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
  delete user._id
  return model.create(user);
}

   export const findAllUsers = () => model.find();;
   export const findUserById = (userId) => model.findById(userId);
   export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};




   
   
   