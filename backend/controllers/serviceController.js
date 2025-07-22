const services = require('../models/serviceModel');

exports.addService = async(req, res) => {
    try {
        const {title, description, category, subCategory,price,priceUnit, location} = req.body;
        const providerId = req.user;
        const images = req.file.filename;
        const newService = 
        res.status(200).json({message : "services of Provider retrieved",ServiceList})
    } catch (error) {
        res.status(404).json({message: "Failed To add Service", error})
    }
}

exports.getUserServices = async(req, res) => {
    try {
        const providerId = req.user;
        console.log(providerId)
        const ServiceList =await services.find({providerId})
        res.status(200).json({message : "services of Provider retrieved",ServiceList})
    } catch (error) {
        res.status(404).json({message: "Failed to retrieve provider services", error})
    }
}