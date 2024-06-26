import React, { useState } from "react"
import TagInput from "../../components/Input/TagInput"
import { MdClose } from "react-icons/md"
import axios from "axios"

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])

  const [error, setError] = useState(null)

  // Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      getAllNotes()
      onClose()

      // console.log(res.data)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  // Edit Note
  const editNote = async () => {}

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }

    if (!content) {
      setError("Please enter the content")
      return
    }

    setError("")

    if (type === "edit") {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400">TITLE</label>

        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-red-400">CONTENT</label>

        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label text-red-400">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  )
}

export default AddEditNotes
