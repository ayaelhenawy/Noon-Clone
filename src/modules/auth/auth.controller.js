import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


import { catchError } from "../../middleware/catchGlobalError.js"
import { AppError } from "../../utilts/appError.js"
import { userModel } from "../../../DataBase/models/user.model.js"
import { sendEmails } from "../../emails/sendEmails.js"


const JWT_SECRET = process.env.JWT_SECRET || "aykey"   // مفتاح واحد ثابت

const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body)
  await user.save()

  // توليد توكن خاص بتأكيد الميل
  const emailToken = jwt.sign(
    { email: user.email },
    aykey,
    { expiresIn: "24h" } // صلاحية ساعة مثلاً
  )

  // بعت ايميل
  await sendEmails(user.email, emailToken)

  // ممكن ترجع رد للموبايل/الفرونت اند
  res.json({
    message: "signup success, please check your email to verify your account",
  })
})

const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email })
  
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
   

    let token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET
    )
     // هنا نتحقق هل عمل Verify ولا لأ
    if (!user.confirmEmail) {
      return next(new AppError("Please verify your email first", 403))
    }
   
    
    return res.json({ message: "success", token })
  }

  next(new AppError("incorrect mail or password", 401))
})


const changeUserPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email })

  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    await userModel.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() }
    )
    let token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET)

    return res.json({ message: "success", token })
  }

  next(new AppError("incorrect mail or password", 401))
})


const protectedRoutes = catchError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to access this route", 401)
    );
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUser = await userModel.findById(decoded.userId);

  if (!currentUser) {
    return next(new AppError("The user belonging to this token no longer exists", 401));
  }

  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000
    );
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new AppError("User recently changed password. Please login again.", 401)
      );
    }
  }

  req.user = currentUser; // نخزن اليوزر في الريكوست
  next();
});



const verifyEmail = catchError(async (req, res, next) => {
  const { token } = req.params; 

  if (!token) {
    return next(new AppError("Token is missing", 400));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, "aykey");
  } catch (err) {
    return next(new AppError("Invalid or expired token", 400));
  }

  const user = await userModel.findOneAndUpdate(
    { email: decoded.email },
    { confirmEmail: true },
    { new: true }
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json({ message: "Email verified successfully ✅" });
});





export {
    signup,
    signin,
    changeUserPassword,
    verifyEmail,
    protectedRoutes

}