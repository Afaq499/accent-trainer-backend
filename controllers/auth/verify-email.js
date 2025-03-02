import Users from "../../models/user.js";

const VerifyEmail = async ({
  userId
}) => {
  try {
    const user = await Users.findOne({ _id: userId });
    if (user) {
      user.status = 'ACTIVE';
      await user.save();
    }

    return {
      message: 'Account Verified Successfully!'
    };
  } catch (error) {
    throw new Error({
      error: error.message
    });
  }

}

export default VerifyEmail;
