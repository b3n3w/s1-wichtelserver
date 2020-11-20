const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.replace("Bearer ", "");

    const decoded = jwt.verify(token, jwtSecretKey);
    req.userData = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};

