const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    console.log(req.header.autherization);
    if (!req.header.autherization) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const { userId } = jwt.verify(
      req.header.autherization,
      split(" ")[1],
      process.env.JWT_SECRET
    );

    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
