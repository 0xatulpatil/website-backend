const express = require("express");
const { SUPERUSER } = require("../constants/roles");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");
const taskRequests = require("../controllers/tasksRequests");
const { cacheResponse } = require("../utils/cache");
const { validateUser } = require("../middlewares/taskRequests");

router.get("/", authenticate, authorizeRoles([SUPERUSER]), cacheResponse(), taskRequests.fetchTaskRequests);
router.get("/:id", authenticate, authorizeRoles([SUPERUSER]), taskRequests.fetchTaskRequestById);
router.post("/addOrUpdate", authenticate, validateUser, taskRequests.addOrUpdate);
router.patch("/approve", authenticate, authorizeRoles([SUPERUSER]), validateUser, taskRequests.approveTaskRequest);

module.exports = router;
