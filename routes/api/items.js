const express = require("express");
const router = express.Router();

// import Item Model / Schema
const Item = require("../../models/Item");

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get("/", (req, res) => {
    Item.find()
        .sort({ date: -1 }) // sort by date in descending order
        .then((items) => res.json(items));
});

// @route   POST /api/items
// @desc    Add an item
// @access  Public
router.post("/", (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });

    // save to database
    newItem.save().then((item) => res.json(item));
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Public
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id).then((item) =>
        item
            .remove()
            .then(() => res.json({ success: true }))
            .catch((err) => res.status(404).json({ success: false }))
    );
});

module.exports = router;
