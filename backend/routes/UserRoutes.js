const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { protect } = require('../middleware/authMiddleware');


router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
