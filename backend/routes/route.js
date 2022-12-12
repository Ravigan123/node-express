const express = require("express");
const router = express.Router();
const authenticate = require("../authenticate");
const isLogged = require("../isLogged");

const UserController = require("../controllers/UserController");
const TransactionController = require("../controllers/TransactionController");
const SaveGoalController = require("../controllers/SaveGoalController");
const CourseController = require("../controllers/CourseController");

//user
router.get("/test", authenticate, UserController.test);

router.post("/login", UserController.login);
router.post("/refresh", UserController.refreshToken);
router.get("/logout", UserController.logout);
router.post("/register", isLogged, UserController.registerUser);
router.get("/confirm/:token/:id", isLogged, UserController.confirmUser);
router.post("/forgot-password", isLogged, UserController.sendForgotPassword);
router.get(
	"/reset-password/:token/:id",
	isLogged,
	UserController.redirectForgotPassword
);
router.put(
	"/reset-password/:token/:id",
	isLogged,
	UserController.changeForgotPassword
);
router.put("/change-password", UserController.changePassword);
router.delete("/user", UserController.deleteUser);
//opcjonalne
// router.put("/role/:id", UserController.changeRole);
// router.put("/active/:id", UserController.changeActive);
// router.put("/change-email/:id", UserController.changeEmail);

//transaction
router.post("/transakcja", authenticate, TransactionController.addTransaction);
// router.get(
// 	"/transakcjaOMiesiac",
// 	auth,
// 	TransactionController.getLastMonthTransaction
// )
router.get(
	"/transaction",
	authenticate,
	TransactionController.getAllTransaction
);
router.get(
	"/transaction/:id",
	authenticate,
	TransactionController.getOneTransaction
);
router.put(
	"/transaction/:id",
	authenticate,
	TransactionController.updateTransaction
);
router.delete(
	"/transaction/:id",
	authenticate,
	TransactionController.deleteTransaction
);

//save goal

router.post("/save-goal", authenticate, SaveGoalController.addSaveGoal);
router.get("/save-goal", authenticate, SaveGoalController.getAllSaveGoal);
router.get("/save-goal/:id", SaveGoalController.getOneSaveGoal);
router.put("/save-goal/:id", authenticate, SaveGoalController.updateSaveGoal);
router.delete(
	"/save-goal/:id",
	authenticate,
	SaveGoalController.deleteSaveGoal
);

//kursy walut

router.post("/course", authenticate, CourseController.addCourse);
router.get("/course", authenticate, CourseController.getCourse);
// router.get("/kursy/:id", CourseController.getCourse);
// router.put("/kursy/:id", CourseController.updateCourse)
router.delete("/course/:id", authenticate, CourseController.deleteCourse);

module.exports = router;
