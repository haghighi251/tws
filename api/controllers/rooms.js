import RoomSchema from "../models/Room.js";
import HotelSchema from "../models/Hotel.js";
import {createError} from "../utils/createError.js";


export const newRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new RoomSchema(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await HotelSchema.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        } catch (e) {
            next(e);
        }
        res.status(200).json(savedRoom);
    } catch (e) {
        next(e);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await RoomSchema.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}

export const availabilityRoom = async (req, res, next) => {
    try {
        await RoomSchema.updateOne(
            {"roomNumbers._id": req.param.id},
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            })
        const updateRoom = await RoomSchema.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        await RoomSchema.findByIdAndDelete(
            req.params.id
        );
        const hotelId = req.params.hotelId;
        try {
            await HotelSchema.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id}})
        } catch (e) {
            next(e);
        }
        res.status(200).json('Room has been deleted.');
    } catch (error) {
        next(error);
    }
}

export const fineRoom = async (req, res, next) => {
    try {
        const room = await RoomSchema.findById(req.params.id);
        res.status(200).json(toom);
    } catch (error) {
        next(error);
    }
}

export const findRooms = async (req, res, next) => {
    try {
        const rooms = await RoomSchema.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
}
