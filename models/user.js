import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new Schema({
  _id: { type: String },
  fullName: { type: String },
  password: { type: String },
  status: {
    type: String,
    default: 'PENDING'
  },
  email: {
    type: String,
    unique: true
  },
  stripeCustomerId: {
    type: String,
    unique: true,
    default:""
  },
  role: {
    type: String,
    default: 'user'
  }
},
  {
    timestamps: true
  })

schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(this.password, 10);
  return next();
});
schema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

schema.pre('findOneAndDelete', async function (next) {
  const userId = this.getQuery()._id;
  await mongoose.model('voiceProgress').deleteMany({ userId });
  next();
});


const Users = mongoose.model('users', schema, 'users');

export default Users;
