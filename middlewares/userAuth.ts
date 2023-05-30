const JWT = require("jsonwebtoken");
import User from "../models/userModels";

async function userAuth (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
            return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
            next();
  });
      } catch (error) {
        console.log(error);
        res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      }
};

export default userAuth;