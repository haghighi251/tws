import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js";
import {deleteRoom, findRooms, fineRoom, newRoom, updateRoom, availabilityRoom} from "../controllers/rooms.js";

const router = express.Router();

// Add a new room.
router.post('/:hotelId', verifyAdmin, newRoom);

// Update a room.
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', availabilityRoom);

// Delete a room.
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

// Get a room.
router.get('/:id', fineRoom);

// Get All rooms
router.get('/', findRooms);

export  default router;




