import { Auth } from "../../models/auth.schema.js";

// GET ALL USERS (ADMIN)
export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("-password");

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE USER ROLE (OPTIONAL)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    const user = await Auth.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
