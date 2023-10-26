const express = require('express');
const app = express();

const mongoDB = require('./db.js');
const port = 5000;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
mongoDB();

app.get('/', (req, res) => {
    res.send("hello world!");

})
app.use(express.json());
app.use('/api', require("./Routes/CreateUsers.js"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData.js"))
app.listen(port, () => {
    console.log("listening on port");


});

