const express = require("express");
const userController = require("../controllers/user");
const multer = require("multer");
const { createNewUser, deleteUser, getAllUsers, updateUser, getsingleUser } =
  userController;
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/getusers", getAllUsers);
router.get("/singleuser/:id", getsingleUser);
router.post("/createuser", upload.single("profile"), createNewUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
