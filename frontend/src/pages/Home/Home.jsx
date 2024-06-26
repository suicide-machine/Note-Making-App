import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import NoteCard from "../../components/Cards/NoteCard"
import { MdAdd } from "react-icons/md"
import AddEditNotes from "./AddEditNotes"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  )

  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])

  // console.log(allNotes)

  const navigate = useNavigate()

  // get user info
  // const getUserInfo = async () => {
  //   try {
  //     const res = await axiosInstance.get("/api/auth/get-user")

  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login")
    } else {
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  }, [])

  // get all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", {
        withCredentials: true,
      })

      if (res.data.success === false) {
        console.log(res.data)
        return
      }

      // console.log(res.data.notes)
      setAllNotes(res.data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/note/delete/" + noteId,
        { withCredentials: true }
      )

      if (res.data.success === false) {
        console.log(res.data.message)
        toast.error(res.data.message)
        setError(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()

      // console.log(res.data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setError(error.message)
    }
  }

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4 mt-8 max-md:m-5">
          {allNotes.map((note, index) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {
                handleEdit(note)
              }}
              onDelete={() => {
                deleteNote(note)
              }}
              onPinNote={() => {}}
            />
          ))}

          {/* <NoteCard
            title={"Meeting on Sunday"}
            date={"5th June, 2024"}
            content={"Meeting on Sunday"}
            tags={"#Meeting"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          /> */}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          getAllNotes={getAllNotes}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
        />
      </Modal>
    </>
  )
}

export default Home
