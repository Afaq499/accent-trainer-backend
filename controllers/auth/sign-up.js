import mongoose from "mongoose";

import User from '../../models/user.js';

import { throwError } from '../../utils/error-msg.js';

const SignUp = async ({
  fullName,
  email,
  password,
}) => {

  if (
    !fullName ||
    !email ||
    !password
  ) {
    throw throwError('Please Provide Complete Information.', 400);
  }
  let user = await User.findOne({ email });
  if (user) {
    throw throwError('Email Already Exists.', 400);
  }

  user = await User.create({
    _id: mongoose.Types.ObjectId().toHexString(),
    fullName,
    email,
    password
  });

  return {
    message: 'Signup Successfully!',
    success: true
  };
}

export default SignUp;
