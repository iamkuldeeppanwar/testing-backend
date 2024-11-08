const User = require("../modal/user.model");

exports.register = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    if (!user || !email || !password) {
      return res.status(404).json({ message: "All Fields are required" });
    }

    const user = await User.create({
      user_name,
      email,
      password,
    });

    const token = await user.getJwtToken();

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ message: "All Fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentails" });
    }

    const token = await user.getJwtToken();

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
