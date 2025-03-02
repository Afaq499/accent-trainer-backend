import Users from "../../models/user.js";

const updateUser = async ({ userId, name }) => {
  await Users.updateOne({
    _id: userId,
  }, {
    $set: {
      fullName: name
    }
  })

  return {
    message: "Updated successfully.",
    success: true,
  };
};

export default updateUser;
