import express from "express";
import Hotel from "../models/Hotel.js";
import {
    newHotel,
    updateHotel,
    deleteHotel,
    fineHotel,
    findHotels,
    countByCity,
    countByType,
    findHotelsByQuery,
    findHotelRooms
} from "../controllers/hotels.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

// Add a new hotel.
router.post('/', verifyAdmin, newHotel);

// Update a hotel.
router.put('/:id', verifyAdmin, updateHotel);

// Delete a hotel.
router.delete('/:id', verifyAdmin, deleteHotel);

// Get a hotel.
router.get('/hotel/:id', fineHotel);

// Get All hotels
router.get('/', findHotels);

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/findHotelsByQuery', findHotelsByQuery);
router.get('/room/:id',findHotelRooms);

export default router;




