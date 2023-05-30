// const userModel = require("../models/userModels");
// const doctorModel = require("../models/doctorModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// //register callback
// const registerController = async (req, res) => {
//   try {
//     const exisitingUser = await userModel.findOne({ email: req.body.email });
//     if (exisitingUser) {
//       return res
//         .status(200)
//         .send({ message: "User Already Exist", success: false });
//     }
//     const password = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     req.body.password = hashedPassword;
//     const newUser = new userModel(req.body);
//     await newUser.save();
//     res.status(201).send({ message: "Register Sucessfully", success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register Controller ${error.message}`,
//     });
//   }
// };
// // login callback
// const loginController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "user not found", success: false });
//     }
//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res
//         .status(200)
//         .send({ message: "Invlid Email or Password", success: false });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res
//       .status(200)
//       .send({ message: "Login Success", success: true, token, data: user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
//   }
// };
// const authController = async (req, res) => {
//   try {
//     const user = await userModel.findById({ _id: req.body.userId });
//     user.password = undefined;
//     if (!user) {
//       return res.status(200).send({
//         message: "User not found",
//         success: false,
//       });
//     } else {
//       res.status(200).send({
//         success: true,
//         data: user,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "auth error",
//       success: false,
//       error,
//     });
//   }
// };
// const applyDoctorController = async (req, res) => {
//   try {
//     const newDoctor = await doctorModel.create({
//       ...req.body,
//       status: "pending",
//     });
//     await newDoctor.save();
//     const adminUser = await userModel.findOne({ isAdmin: true });
//     const notification = adminUser.notification;
//     notification.push({
//       type: "apply-doctor-requiest",
//       message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
//       data: {
//         doctorId: newDoctor._id,
//         name: newDoctor.firstName + " " + newDoctor.lastName,
//         onClickPath: "/admin/doctors",
//       },
//     });
//     await userModel.findByIdAndUpdate(adminUser._id, { notification });
//     res.status(201).send({
//       success: true,
//       message: "Doctor Account Applied Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error,
//       message: "Error While Applying for Doctor",
//     });
//   }
// };
// const getAllNotificationController = async (req, res) => {
//   try {
//     const user = await userModel.findById({ _id: req.body.userId });
//     const seennotification = user.seennotification;
//     const notification = user.notification;
//     seennotification.push(...notification);
//     user.notification = [];
//     user.seennotification = seennotification;
//     const updateUser = await user.save();
//     res.status(200).send({
//       success: true,
//       message: "all notification as read",
//       data: updateUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error in notification",
//       success: true,
//       error,
//     });
//   }
// };
// const deleteAllNotificationController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ _id: req.body.userId });
//     user.notification = [];
//     user.seennotification = [];
//     const updatedUser = await user.save();
//     updatedUser.password = undefined;
//     res.status(200).send({
//       success: true,
//       message: "All Notifications deleted successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Unable to delete all notification",
//       error,
//     });
//   }
// };
// module.exports = {
//   loginController,
//   registerController,
//   authController,
//   applyDoctorController,
//   getAllNotificationController,
//   deleteAllNotificationController,
// };
//# sourceMappingURL=userController.js.map