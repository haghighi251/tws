import HotelSchema from "../models/Hotel.js";
import RoomSchema from "../models/Room.js";

export const newHotel = async (req, res, next) => {
    const newHotel = new HotelSchema(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel =  await HotelSchema.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true }
        );
        res.status(200).json(updateHotel);
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await HotelSchema.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json('Hotel has been deleted.');
    } catch (error) {
        next(error);
    }
}

export const fineHotel = async (req, res, next) => {
    try {
        const hotel =  await HotelSchema.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

export const findHotels = async (req, res, next) => {
    try {
        const hotels = await HotelSchema.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

export const countByCity = async (req, res, next) => {
    try {
        const cities = req.query.cities.split(',');

        const list = await Promise.all(cities.map( (city)=>{
            return HotelSchema.countDocuments({city:city});
        } ));
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await HotelSchema.countDocuments({type:"hotel"});
        const apartmentCount = await HotelSchema.countDocuments({type:"apartment"});
        const resortCount = await HotelSchema.countDocuments({type:"resort"});
        const villaCount = await HotelSchema.countDocuments({type:"villa"});
        const cabinCount = await HotelSchema.countDocuments({type:"cabin"});

        res.status(200).json([
            {type:"hotel", count: hotelCount},
            {type:"apartment", count: apartmentCount},
            {type:"resort", count: resortCount},
            {type:"villa", count: villaCount},
            {type:"cabin", count: cabinCount}
        ]);
    } catch (error) {
        next(error);
    }
}

export const findHotelsByQuery = async (req, res, next) => {
    try {
        const {min, max, ...others} = req.query;
        const hotels = await HotelSchema.find({
            ...others,
            cheapestPrice:{$gte:min, $lte:max}
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

export const findHotelRooms = async (req, res, next) => {
    try {
        const hotel = await HotelSchema.findById(req.params.id);
        const RoomsList = await Promise.all(hotel.rooms.map(
             room => {
                return RoomSchema.findById(room);
            }
        ));
        res.status(200).json(RoomsList);
    } catch (error) {
        next(error);
    }
}
