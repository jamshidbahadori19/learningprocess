//This code exports a middleware function named verifyToken that checks if a user is authorized to access a protected route. It first checks if the request headers contain an authorization token, and if not, it sends a response with a "Not authorized" message. If a token is present, it is extracted from the headers and verified using a private key stored in the environment variables. If the token is invalid, the middleware sends a response with an "Invalid Token" message. If the token is valid, the middleware sets the req.user property to the verified token and calls the next() function to pass control to the next middleware or route handler. If an error occurs during the verification process, the middleware sends a response with a 500 status code and an error message.

const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.send({ msg: "Not authorized" });
    }
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).send({ msg: "not valid token" });
    }

    let verifiedToken = jwt.verify(token, process.env.privateKey);

    if (!verifiedToken) {
      res.send({ msg: "Invalid Token" });
    } else {
      req.user = verifiedToken;
      next();
    }
  } catch (error) {
    res.status(500).send({ msg: "ERROR!!!", error });
  }
};

module.exports = verifyToken;
