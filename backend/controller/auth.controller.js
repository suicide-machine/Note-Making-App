import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  const isValidUser = await User.findOne({ email })

  if (isValidUser) {
    return next(errorHandler(404, "User Already Exist"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.status(201).json({
      success: true,
      message: "User Created Succcessfully",
    })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, "User not found"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    const { password: pass, ...rest } = validUser._doc

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login Successful!",
      rest,
    })
  } catch (error) {
    next(error)
  }
}

export const getuser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id })

    if (!user) {
      return next(errorHandler(404, "User not found!"))
    }

    const { password: pass, ...rest } = user._doc

    res.status(200).json({
      success: true,
      rest,
    })
  } catch (error) {}
}
