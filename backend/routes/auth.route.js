import express from "express"
import {
  getuser,
  signin,
  signout,
  signup,
} from "../controller/auth.controller.js"
import { verifyToken } from "../utils/varifyUser.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", verifyToken, signout)
router.get("/get-user", verifyToken, getuser)

export default router
