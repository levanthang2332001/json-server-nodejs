const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/data.js");
const morgan = require("morgan");
const menuRoutes = require("./routes/menuRoutes.js");
const googleRoutes = require("./routes/googleRoutes.js");
const subscribeRoutes = require("./routes/subscribeRoutes");
const bookRoutes = require("./routes/bookRoutes");
const fs = require("fs");
const path = require("path");

db.connect();

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use('/',cors());
app.use(morgan("common"));

app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use('/api/menu', menuRoutes);
app.use('/api/user',googleRoutes);
app.use('/api',subscribeRoutes);
app.use('/api',bookRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

