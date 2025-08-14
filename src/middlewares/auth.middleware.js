import jwt from "jsonwebtoken";
import  responseError  from "../utils/errorHandler.js";



const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) throw new responseError(401, "Unauthenticated - Invalid Token");
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") throw new responseError(401, "Unauthenticated - Invalid Token");

    let _id;
    try {
        ({ _id, role } = jwt.verify(token, process.env.JWT_ACCESS_SECRET));
    } catch (error) {
        throw new responseError(401, "Unauthenticated - Invalid Token");
    }
    req.userRole = role;
    req.userId = _id;
    next();
};


export default authenticate;