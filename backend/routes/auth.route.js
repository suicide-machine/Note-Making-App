import express from "express"
import { getuser, signin, signup } from "../controller/auth.controller.js"
import { verifyToken } from "../utils/varifyUser.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/get-user", verifyToken, getuser)

export default router
