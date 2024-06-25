import express from "express"
import { verifyToken } from "../utils/varifyUser.js"
import { addNote } from "../controller/note.controller.js"

const router = express.Router()

router.post("/add-note", verifyToken, addNote)

export default router
