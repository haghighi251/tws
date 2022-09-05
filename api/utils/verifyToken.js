import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated."));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err){
            return next(createError(403, "Token is not valid."));
        }
        req.user_info = user;
        next();
    });
}

export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user_info.id === req.params.id || req.user_info.isAdmin){
            next();
        }else{
            return next(createError(403, 'You are not authorized.'));
        }
    });
}

export const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        console.log(req.user_info.isAdmin);
        if(req.user_info.isAdmin){
            next();
        }else{
            return next(createError(403, 'You are not authorized.'));
        }
    });
}
