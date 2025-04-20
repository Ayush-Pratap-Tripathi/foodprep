const foodModel = require('../models/foodModel');
const path = require('path');
const fsPromises = require('fs').promises;

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const image_filename = req.file.filename;

        const food = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category,
        });

        res.status(201).json({ message: "Food added successfully", food });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeFood = async (req, res) => {
    try {
        const { id } = req.query;
        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        // Delete the image from /uploads directory
        const imagePath = path.resolve(__dirname, `../uploads/${food.image}`);
        await fsPromises.unlink(imagePath);

        // Delete the food from DB
        await foodModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addFood, listFood, removeFood };
