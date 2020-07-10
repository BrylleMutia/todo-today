const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

// body-parser middleware
app.use(express.json());

// connect to db 
// local: "mongodb://127.0.0.1:27017"
// atlas: "mongodb+srv://bryllemutia3:bryllem3@cluster0.jvmef.mongodb.net/todos?retryWrites=true&w=majority"
const db = config.get("mongoURI");
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log(`Connected to database: ${db}`))
    .catch((err) => console.error(err));

// Use routes (redirect all api requests to routes file)
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production (react-npm run build)
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// initialize port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
