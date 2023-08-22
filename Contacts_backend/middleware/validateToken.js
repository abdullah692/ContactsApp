const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.authorization;
  console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        // console.log(err);
         res.status(406).send({
          success: false,
          message: "Token is expired",
        });
      }

    //   console.log(decoded,'vvvvvvvvvvvvvvvvvvvvvvvvvvv');
      req.user=decoded.user;
      next();
    //   console.log(req.user,'aaaaaaaaaaaaaaaaaaaaaaaa');
    });
  }
};

module.exports = validateToken;
