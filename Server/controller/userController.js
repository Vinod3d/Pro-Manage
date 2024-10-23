import { User } from "../models/userSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { JwtService } from "../services/JwtService.js";

// REGISTER USER

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(CustomErrorHandler.alreadyExist("Email is already registered"));
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
        newUser, 
        message: "User registered successfully" 
    });
  } 
  
  catch (error) {
    
    if (error.name === "ValidationError") {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return next(CustomErrorHandler.validationError(errorMessages.join(', ')));
    }

    next(error)
  }
};


// LOGIN USER

export const login = async (req, res, next)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return next(CustomErrorHandler.badRequest("Email and password are required."));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(CustomErrorHandler.wrongCredentials('Invalid email'));
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return next(CustomErrorHandler.unAuthorized('Invalid password.'));
        }

        JwtService(user, "User Logged in Successfully", 200, res);
    } catch (error) {
        next(error);
    }
}

// LOGOUT USER

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
    
        res.status(200).json({
            success: true,
            message: "logged out",
        });
    } 
    
    catch (error) {
        return next(error);
    }
};


// GET ALL USERS

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.find().select('-password');
        if (!users || users.length === 0) {
            return next(CustomErrorHandler.notFound("No users found"));
        }

        res.status(200).json({
            users,
            message: "Users retrieved successfully",
        });
    } 
    catch (error) {
        next(error)
    }
}


// GET SINGLE USER

export const getUser = async (req, res, next)=>{
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return next(CustomErrorHandler.notFound('User not found'));
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
}