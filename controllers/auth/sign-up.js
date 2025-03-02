import mongoose from "mongoose";

import User from '../../models/user.js';

import { generateToken } from '../../middlewares/auth.js';
import { throwError } from '../../utils/error-msg.js';
import { emailVerificationTemplate } from '../../utils/email-templates.js';
import { sendEmail } from '../../utils/send-email.js';

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
    throw throwError('Email Already Exists.', 409);
  }
  user = await User.create({
    _id: mongoose.Types.ObjectId().toHexString(),
    fullName,
    email,
    password
  });
  const { _id } = user
  const { token } = generateToken({
    _id,
    email,
    name: fullName,
  });
  await sendEmail(
    email,
    'Account Verification Link!',
    emailVerificationTemplate(
      fullName,
      token,
    ),
  );
  return {
    message: 'SignUp Successfully!',
    success: true
  };
}

export default SignUp;
