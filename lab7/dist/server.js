"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const mongoHelper_1 = require("./mongoHelper");
const port = 3000;
const server = http.createServer(app_1.default);
server.listen(port);
server.on('listening', async () => {
    console.log(`listening to port ${port}`);
    try {
        await mongoHelper_1.MongoHelper.connect('mongodb://127.0.0.1:27017');
        console.log("Connected to Mongo");
    }
    catch (err) {
        console.log(err);
    }
});
