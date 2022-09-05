import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const registerNewUser = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        await newUser.save();
        res.status(200).json('New user has been created.');
    } catch (e) {
        next(e);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const user  = await User.findOne({username: req.body.username});
        if(!user){
            return next(createError(404, "Username or password is not correct."));
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword){
            return next(createError(400, "Username or password is not correct."));
        }

        const token = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT);

        // We shouldn't show user's password and isAdmin field in the result.
        const {password, isAdmin, ...otherDetails} = user._doc;

        res.cookie(
            "access_token",
            token,
            {
                httpOnly:true
            }).status(200).json({...otherDetails});
    } catch (e) {
        next(e);
    }
}