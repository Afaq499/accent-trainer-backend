import Users from "../../models/user.js";

const GetUsers = async ({
  userId
}) => {
  const filter = {
    _id: userId
  }
    const userInfo = await Users.findOne(filter).select({
      fullName: 1,
      email: 1,
      stripeCustomerId:1
    });

    return { userInfo, success: true }
}

export default GetUsers;
