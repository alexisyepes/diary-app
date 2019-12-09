const router = require("express").Router();
const usersRoutes = require("./users");

// User routes
router.use("/users", usersRoutes);

module.exports = router;
