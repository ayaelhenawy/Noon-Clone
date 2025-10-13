// auth.middleware.js
import jwt from "jsonwebtoken";
import { userModel } from "../../DataBase/models/user.model.js";
import { AppError } from "../utilts/appError.js";

const JWT_SECRET = process.env.JWT_SECRET || "aykey";

// Middleware للتأكد من صحة الـ Token (Bearer)
export const protect = async (req, res, next) => {
  try {
    let token;

    // التأكد إن الهيدر فيه Authorization وفيه Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1]; // ناخد الجزء التاني
    }

    if (!token) {
      return next(new AppError("You are not logged in. Please provide a token.", 401));
    }

    // التحقق من صحة التوكن
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return next(new AppError("Invalid or expired token.", 401));
    }

    // جلب اليوزر من الـ DB
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return next(new AppError("User no longer exists.", 401));
    }

    // التأكد من إنه مغيرش الباسورد بعد إصدار التوكن
    if (user.passwordChangedAt) {
      const changedTime = parseInt(user.passwordChangedAt.getTime() / 1000);
      if (changedTime > decoded.iat) {
        return next(new AppError("Password recently changed. Please login again.", 401));
      }
    }

    // نحط اليوزر في req علشان نستخدمه بعدين
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
