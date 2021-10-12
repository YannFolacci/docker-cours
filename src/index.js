const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MessageModel = require("./MessageModel")

process.on("SIGINT", () => {
    console.log("Caught interrupt signal");
    process.exit();
});

process.on("SIGTERM", () => {
    console.log("Caught interrupt signal");
    process.exit();
});

(async () => {
    console.log("Connecting to MongoDB");
    await mongoose.connect("mongodb", { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Connected");

    app.get('/', (req, res) => {
        console.log("Just got a request");
        res.json({ message: "Hey, welcome into my API" });
    });

    app.post('/', async (req, res) => {
        console.log("Just got a post");
        const message = new MessageModel({ sentence: "Hey I'm a new post!" });
        const result = await message.save();
        res.json({ message: "Hey, I saved a post", result });
    })

    app.listen(5000, () => {
        console.log("Server is running");
    });
})();
