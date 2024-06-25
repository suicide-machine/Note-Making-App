import express from "express"
import { verifyToken } from "../utils/varifyUser.js"
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
} from "../controller/note.controller.js"

const router = express.Router()

router.post("/add", verifyToken, addNote)
router.put("/edit/:noteId", verifyToken, editNote)
router.get("/all", verifyToken, getAllNotes)
router.delete("/delete/:noteId", verifyToken, deleteNote)

export default router
