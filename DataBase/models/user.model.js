import mongoose, { Types } from "mongoose";
import bcrypt from 'bcrypt';
import './product.model.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'too short name'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [{ type: Types.ObjectId, ref: "product" }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  confirmEmail: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  passwordChangedAt: Date,
}, { timestamps: true });

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.pre('findOneAndUpdate', function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const userModel = mongoose.model('User', userSchema);
