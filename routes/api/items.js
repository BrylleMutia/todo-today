const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// import Item Model / Schema
const User = require("../../models/User");

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get("/:id", (req, res) => {
    const id = req.params.id;
    // userId is a string
    // userId = "5f1ea1c2aa10f21f903b9aa9"

    // find current user to show todos
    User.findById(id)
        .then((currentUser) => res.json(currentUser.todos)) // result NULL
        .catch((err) => res.status(404).json({ msg: "Unable to get items" }));
});

// @route   POST /api/items
// @desc    Add an item
// @access  Private
// add auth middleware for authentication
router.post("/:id", auth, (req, res) => {
    const { name } = req.body;
    const id = req.params.id;

    User.findById(id)
        .then((currentUser) => {
            currentUser.todos.unshift({ name });
            currentUser
                .save()
                .then((user) => res.json(user.todos[0]))
                .catch((err) => res.status(400).res.json(err));
        })
        .catch((err) => res.status(400).json(err));
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
// add auth middleware for authentication
router.delete("/:id/:itemid", auth, (req, res) => {
    const { id, itemid } = req.params;

    User.findById(id)
        .then((currentUser) => {
            selectedTodo = currentUser.todos.filter((item) => item._id.toString() === itemid);
            currentUser.todos.remove(selectedTodo[0]);
            selectedTodo[0].completed = true;
            currentUser.todos.push(selectedTodo[0]);
            currentUser.save().then((user) => res.json(user.todos));
        })
        .catch((err) => res.status(400).json(err));

    // Item.findById(req.params.id).then((item) =>
    //     item
    //         .remove()
    //         .then(() => res.json({ success: true }))
    //         .catch((err) => res.status(404).json({ success: false }))
    // );
});

module.exports = router;
