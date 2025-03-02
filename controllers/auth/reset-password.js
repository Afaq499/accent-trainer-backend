import User from '../../models/user.js';

const ResetPassword = async ({
  userId,
  password
}) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      user.password = password;
      await user.save();
    }

    return {
      message: 'Password Updated Successfully!'
    };
  } catch (error) {
    throw new Error({
      error: error.message
    });
  }
};

export default ResetPassword;
