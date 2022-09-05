import express from "express";
import {
    updateUser,
    deleteUser,
    fineUser,
    findUsers
} from "../controllers/users.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";

const router = express.Router();

/*// Check user cookie
router.get('/authentication', verifyToken, (req, res, next)=>{
    res.send("Hello user. You are logged.");
});

router.get('/checkuser/:id', verifyUser, (req, res, next)=>{
    res.send("Hello user. You are logged.");
});*/

// Update a user.
router.put('/:id', verifyUser, updateUser);

// Delete a user.
router.delete('/:id', verifyUser, deleteUser);

// Get a user.
router.get('/:id', verifyUser, fineUser);

// Get All users
router.get('/', verifyAdmin, findUsers);

export  default router;




