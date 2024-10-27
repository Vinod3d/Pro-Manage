import { User } from "../models/userSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { JwtService } from "../services/JwtService.js";

// REGISTER USER

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(
        CustomErrorHandler.alreadyExist("Email is already registered")
      );
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(CustomErrorHandler.validationError(errorMessages.join(", ")));
    }

    next(error);
  }
};

// LOGIN USER

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      CustomErrorHandler.badRequest("Email and password are required.")
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials("Invalid email"));
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return next(CustomErrorHandler.unAuthorized("Invalid password."));
    }

    JwtService(user, "User Logged in Successfully", 200, res);
  } catch (error) {
    next(error);
  }
};

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
  } catch (error) {
    return next(error);
  }
};

// GET ALL USERS

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return next(CustomErrorHandler.notFound("No users found"));
    }

    res.status(200).json({
      users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE USER

export const getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ADD MEMBER

export const addMember = async (req, res, next) => {
  const { _id } = req.user;
  const { email } = req.body;

  if (!email) {
    return next(CustomErrorHandler.badRequest("Please enter email"));
  }

  try {
    const user = await User.findById(_id);

    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    if (!user.addPeople.includes(email)) {
      user.addPeople.push(email);
      await user.save();
      return res
        .status(200)
        .json({ message: "New member added", user });
    } else {
      return next(CustomErrorHandler.badRequest("This member Already added"));
    }
  } catch (error) {
    next(error);
  }
};


// UPDATE USER

export const updateUser = async (req, res, next) => {
  const { name, email, oldPassword, newPassword } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (oldPassword && newPassword) {
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return next(CustomErrorHandler.unAuthorized("Old password is incorrect"));
      }
      updateData.password = newPassword; // Will be hashed by the schema's pre-save hook
    } else if (oldPassword || newPassword) {
      return next(
        CustomErrorHandler.badRequest("Both old and new passwords are required to change the password.")
      );
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};