import React, { useState } from "react"
import ProfileInfo from "./Cards/ProfileInfo"
import { useNavigate } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import { useDispatch } from "react-redux"
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice"
import axios from "axios"
import axiosInstance from "../utils/axiosInstance"

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onLogout = async () => {
    try {
      dispatch(signOutUserStart())

      const res = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      })

      if (res.data.success === false) {
        dispatch(signOutUserFailure(data.message))
      }

      dispatch(signOutUserSuccess())
      navigate("/login")
    } catch (error) {
      dispatch(signOutUserFailure())
    }
  }

  const handleSearch = () => {}

  const onClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <span className="text-slate-500">Good</span>
        <span className="text-slate-900">Notes</span>
      </h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value)
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar
