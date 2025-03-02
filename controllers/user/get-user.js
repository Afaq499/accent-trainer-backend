import Users from '../../models/user.js';

const GetUser = async ({
  userId
}) => {
  const user = await Users.findOne({
    _id: userId
  }).select({
    isStoreExist: 1,
    role: 1,
  });

  return {
    message: 'Success',
    user
  }
}

export default GetUser;
