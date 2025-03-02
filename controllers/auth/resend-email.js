import Users from "../../models/user.js";

import { generateToken } from "../../middlewares/auth.js";
import { sendEmail } from "../../utils/send-email.js";
import { emailVerificationTemplate, resetPasswordTemplate } from "../../utils/email-templates.js";
import { throwError } from "../../utils/error-msg.js";

const ResendEmail = async ({
  email,
  type
}) => {
  try {
    const user = await Users.findOne({ email });
    if(!user) {
      throw throwError('This Email is not registered', 401);
    }

    const { _id, fullName: name } = user
    const { token } = generateToken({
      _id,
      email,
      name,
    });

    if (type === 'resetPassword') {
      await sendEmail(
        email,
        'Reset Password Link!',
        resetPasswordTemplate(
          name,
          token,
        ),
      );

    } else {
      await sendEmail(
        email,
        'Account Varification Link!',
        emailVerificationTemplate(
          name,
          token,
        ),
      );
    }

    return {
      message: 'Email Sent Successfully!'
    };
  } catch ({ error }) {
    throw throwError(error, 400);
  }
}

export default ResendEmail;
