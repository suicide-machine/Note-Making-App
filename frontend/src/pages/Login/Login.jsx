import React, { useState } from "react"
import Navbar from "../../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../../components/Input/PasswordInput"
import { validateEmail } from "../../utils/helper"
import axiosInstances from "../../utils/axiosInstance"
import { useDispatch, useSelector } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { loading, errorDispatch } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")
    // Login Api

    try {
      dispatch(signInStart())

      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        dispatch(signInFailure(res.data.message))
        toast.error(res.data.message)
        return
      }

      dispatch(signInSuccess(res.data))
      toast.success(res.data.message)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-primary underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
