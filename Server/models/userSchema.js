import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { JWT_EXPIRES, JWT_KEY } from "../config/Index.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    addPeople: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((email) => /.+@.+\..+/.test(email));
        },
        message: (props) => `${props.value} contains an invalid email address`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// FOR HASHING PASSWORD
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// GENERATING JSON WEB TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, JWT_KEY, {expiresIn : JWT_EXPIRES})
}

export const User = mongoose.model("User", userSchema);