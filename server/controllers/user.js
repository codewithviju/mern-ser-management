const userModel = require("../models/user");
const fs = require("fs");
const path = require("path");
class userController {
  static getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
  static createNewUser = async (req, res) => {
    const { name, email, gender, phone } = req.body;
    try {
      if (name && email && gender && phone) {
        const newUser = new userModel({
          name,
          email,
          phone,
          gender,
          profile: req.file.filename,
        });

        const resData = await newUser.save();
        if (resData) {
          return res.json({ message: "user Added" });
        } else {
          return res.json({ message: "Something went Wrong" });
        }
      } else {
        return res.json({ message: "All fields Are Required" });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
  static updateUser = async (req, res) => {};
  static deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (deletedUser) {
        fs.unlink(
          path.join(`public/uploads/${deletedUser.profile}`),
          (error) => {
            return error;
          }
        );
      }
      if (deletedUser) {
        return res.json({ message: "user Deleted" });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
}

module.exports = userController;
