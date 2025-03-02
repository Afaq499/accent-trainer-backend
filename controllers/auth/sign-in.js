import bcrypt from 'bcryptjs';

import User from '../../models/user.js';

import { generateToken } from '../../middlewares/auth.js';
import { throwError } from '../../utils/error-msg.js';

const SignIn = async ({
  password: pass,
  email
}) => {
  if (!pass || !email) {
    throw throwError('Email and Password is required.', 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw throwError('Invalid email or password.', 400);
  }
  const { _id, fullName, password, status, isAdmin } = user;

  if (status === 'PENDING') {
    throw throwError('Please first verify you email.', 400);
  }

  const isMatch = await bcrypt.compare(pass, password);
  if (!isMatch) {
    throw throwError('Invalid email or password.', 400);
  }

  const { token } = generateToken({
    _id,
    email,
    name: fullName,
  });
  return {
    success: true,
    token,
    user: {
      _id,
      email,
      fullName
    }
  };
};

export default SignIn;
